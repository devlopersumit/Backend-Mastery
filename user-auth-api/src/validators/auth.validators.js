import { body, validationResult } from 'express-validator';

// 1. Common middleware to catch validation errors and block the request
const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Returns a 400 Bad Request with all validation errors
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // No errors? Move to the controller!
};

// 2. Signup Validation & Sanitization Rules
export const signupValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long')
    .escape(), // Sanitizes HTML tags to prevent XSS attacks

  body('lastName')
    .trim()
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(), // Sanitizes email (e.g., converts to lowercase, removes dots in gmail if applicable)

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8, max: 128 }).withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  validateResult // Executes the error checker at the end of the array
];

// 3. Login Validation & Sanitization Rules
export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),

  validateResult
];