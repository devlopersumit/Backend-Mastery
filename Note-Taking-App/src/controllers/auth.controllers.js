const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body || {};

        if (!username || typeof username !== "string" || username.trim().length < 3 || username.trim().length > 30) {
            return res.status(400).json({
                status: "failed",
                message: "Username must be between 3 and 30 characters",
            });
        }

        if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide a valid email",
            });
        }

        if (!password || typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                status: "failed",
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(409).json({
                status: "failed",
                message: existingUser.email === email ? "Email already registered" : "Username already taken",
            });
        }

        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Server error",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide a valid email",
            });
        }

        if (!password || typeof password !== "string" || password.length < 1) {
            return res.status(400).json({
                status: "failed",
                message: "Password is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Server error",
            error: error.message,
        });
    }
};

const getProfile = async (req, res) => {
    return res.status(200).json({
        status: "success",
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        },
    });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};
