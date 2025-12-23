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

// @route   GET api/contacts
// @desc    Get all contacts (admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/contacts/:id
// @desc    Get a specific contact by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/contacts/:id
// @desc    Update contact status/priority
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { status, priority } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, priority },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    
    res.json({ msg: 'Contact removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;