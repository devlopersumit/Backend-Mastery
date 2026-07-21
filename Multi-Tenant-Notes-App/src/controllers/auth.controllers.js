import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

//User Registration
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        const jwtToken = jwt.sign(
            { id: newUser._id, email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { id: newUser._id, firstName, lastName, email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with password field
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Validate password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Send JWT in secure cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 15
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};