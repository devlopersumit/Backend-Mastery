
//Signup Validator
export const signupValidator = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body || {};
    const errors = [];

    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
        errors.push('First name is required');
    } else if (firstName.trim().length < 3) {
        errors.push('First name must be at least 3 characters long');
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
        errors.push('Last name is required');
    } else if (lastName.trim().length < 2) {
        errors.push('Last name must be at least 2 characters long');
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please provide a valid email address');
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    req.body = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password
    };

    next();
};

//Login Validator
export const loginValidator = (req, res, next) => {
    const { email, password } = req.body || {};
    const errors = [];

    if (!email || typeof email !== 'string' || email.trim() === '') {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please provide a valid email address');
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    req.body = {
        email: email.trim().toLowerCase(),
        password
    };

    next();
};