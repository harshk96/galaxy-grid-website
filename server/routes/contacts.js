const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const router = express.Router();

// @route   POST api/contacts
// @desc    Submit a new contact form
// @access  Public
router.post('/', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('projectType', 'Project type is required').not().isEmpty(),
  body('message', 'Message is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, projectType, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      projectType,
      message
    });

    const contact = await newContact.save();
    res.status(201).json({ msg: 'Contact form submitted successfully', contact });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;