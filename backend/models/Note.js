const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  body: {
    type: String,
    required: [true, 'Please add note details']
  },
  tags: {
    type: [String],
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Index for search functionality
noteSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('Note', noteSchema);
