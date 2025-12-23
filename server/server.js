const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import routes
const contactRoutes = require('./routes/contacts');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// API routes
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../client')));

// Handle fallback for client-side routing
app.get('*', (req, res) => {
  // Don't interfere with API routes
  if (req.originalUrl.startsWith('/api/')) {
    res.status(404).json({ message: 'API endpoint not found' });
    return;
  }
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Galaxy Grid Server API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/galaxygrid';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Create default admin user if it doesn't exist
    try {
      const adminEmail = 'admin@galaxygrid.com';
      console.log('Checking for existing admin user...');
      const existingAdmin = await User.findOne({ email: adminEmail });
      
      if (!existingAdmin) {
        console.log('No admin user found, creating default admin...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = new User({
          username: 'admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin'
        });
        
        await adminUser.save();
        console.log('Default admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password: admin123');
      } else {
        console.log('Admin user already exists with email:', existingAdmin.email);
      }
    } catch (error) {
      console.error('Error creating admin user:', error.message);
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });