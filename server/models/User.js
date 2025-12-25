const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error.message);
    throw error;
  }
};

// Add static method for soft delete
userSchema.statics.softDelete = async function(id) {
  return await this.findByIdAndUpdate(id, { deletedAt: new Date() });
};

// Add static method to find non-deleted users
userSchema.statics.findNonDeleted = function(filter = {}) {
  return this.find({ ...filter, deletedAt: null });
};

// Add static method to find one non-deleted user
userSchema.statics.findOneNonDeleted = function(filter = {}) {
  return this.findOne({ ...filter, deletedAt: null });
};

// Update the countDocuments to exclude deleted users
userSchema.statics.countNonDeleted = function(filter = {}) {
  return this.countDocuments({ ...filter, deletedAt: null });
};

module.exports = mongoose.model('User', userSchema);