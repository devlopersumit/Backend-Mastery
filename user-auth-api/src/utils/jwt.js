import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getToken = () => {
    return process.env.JWT_SECRET;
};

export const generateToken = (user) => {
    const secret = getToken();

    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        }
    );
};

export const verifyToken = (token) => {
    const secret = getToken();

    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.verify(token, secret);
};