const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a new admin user
// @access  Public
router.post('/register', [
  body('username', 'Username is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Registration validation errors:', errors.array());
      return res.status(400).json({ 
        errors: errors.array(),
        msg: 'Validation failed'
      });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password
    });

    await user.save();
    console.log('User created successfully:', user.email);

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error in registration:', err.message);
          return res.status(500).json({ msg: 'Token generation failed' });
        }
        res.json({ 
          token, 
          user: { 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
          } 
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error.message, error.stack);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        errors: errors.array(),
        msg: 'Validation failed'
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('User authenticated successfully:', user.email);
    
    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err.message);
          return res.status(500).json({ msg: 'Token generation failed' });
        }
        res.json({ 
          token, 
          user: { 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
          } 
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// @route   GET api/auth/me
// @desc    Get user data
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;