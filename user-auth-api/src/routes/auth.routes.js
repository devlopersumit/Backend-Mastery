import express from 'express';
import { signup, login, logout } from '../controller/auth.controllers.js';
import { signupValidator, loginValidator } from '../validators/auth.validators.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/logout', logout);

export default router;
