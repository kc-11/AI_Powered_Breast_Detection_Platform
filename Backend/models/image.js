const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBuffer: Buffer,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Optional: auto-delete after 1 hour
  }
});

module.exports = mongoose.model('Image', imageSchema);
