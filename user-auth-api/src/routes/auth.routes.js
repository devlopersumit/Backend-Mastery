import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { signupValidator, loginValidator } from '../validators/auth.validator.js';

const router = express.Router();

// The signupValidator runs FIRST. If it fails, signup controller never executes.
router.post('/signup', signupValidator, signup);

// The loginValidator runs FIRST. If it fails, login controller never executes.
router.post('/login', loginValidator, login);

export default router;
