import jwt from 'jsonwebtoken';

const getJWTSecret = () => {
    return process.env.JWT_SECRET;
}

//Generate JWT Token
export const generateToken = (user) => {
   const secretKey = getJWTSecret();
   return jwt.sign(user, secretKey);
};

export const verifyToken = (token) => {
    const secretKey = getJWTSecret();
    return jwt.verify(token, secretKey);
}

