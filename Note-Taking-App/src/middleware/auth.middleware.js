const User = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Not authorized. No token provided.",
            });
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "User not found.",
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid or expired token.",
        });
    }
};

module.exports = protect;
