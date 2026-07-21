import express from 'express';
import { loginValidator, signupValidator } from '../middlewares/validate.middleware.js';
import { login, logout, register } from '../controllers/auth.controllers.js';

const authRouter = express.Router();

//signup route
authRouter.post('/register', signupValidator, register);

//Login route
authRouter.post('/login', loginValidator, login);

//Logout route
authRouter.get('/logout', logout);

export default authRouter;