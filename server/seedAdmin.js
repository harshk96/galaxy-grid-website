const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const adminUser = {
  username: 'admins',
  email: 'admin@gmail.com',
  password: 'admin123',
  role: 'admin'
};

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/galaxygrid';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create new admin user
    const user = new User(adminUser);
    await user.save();
    
    console.log('Admin user created successfully');
    console.log('Username:', adminUser.username);
    console.log('Email:', adminUser.email);
    console.log('Password: admin123');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();