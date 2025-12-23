const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Get counts for dashboard
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' })     ;
    const inProgressContacts = await Contact.countDocuments({ status: 'in-progress' });
    const resolvedContacts = await Contact.countDocuments({ status: 'resolved' });
    
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.json({
      totalContacts,
      newContacts,
      inProgressContacts,
      resolvedContacts,
      totalAdmins
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/contacts
// @desc    Get contacts with pagination and filtering
// @access  Private
router.get('/contacts', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const priority = req.query.priority;
    const search = req.query.search;

    // Build filter object
    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/admin/contacts/:id/status
// @desc    Update contact status
// @access  Private
router.put('/contacts/:id/status', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
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

// @route   PUT api/admin/contacts/:id/priority
// @desc    Update contact priority
// @access  Private
router.put('/contacts/:id/priority', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { priority } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { priority },
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

// @route   GET api/admin/users
// @desc    Get all users (admins)
// @access  Private
router.get('/users', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/admin/users
// @desc    Create a new admin user
// @access  Private
router.post('/users', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { username, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password, // Password will be hashed in the User model pre-save hook
      role: role || 'admin'
    });

    await user.save();

    // Return user without password
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Private
router.delete('/users/:id', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;