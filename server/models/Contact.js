const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Add static method for soft delete
contactSchema.statics.softDelete = async function(id) {
  return await this.findByIdAndUpdate(id, { deletedAt: new Date() });
};

// Add static method to find non-deleted contacts
contactSchema.statics.findNonDeleted = function(filter = {}) {
  return this.find({ ...filter, deletedAt: null });
};

// Add static method to find one non-deleted contact
contactSchema.statics.findOneNonDeleted = function(filter = {}) {
  return this.findOne({ ...filter, deletedAt: null });
};

// Update the countDocuments to exclude deleted contacts
contactSchema.statics.countNonDeleted = function(filter = {}) {
  return this.countDocuments({ ...filter, deletedAt: null });
};

module.exports = mongoose.model('Contact', contactSchema);