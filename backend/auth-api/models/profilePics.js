const mongoose = require('mongoose');

const profilePics = new mongoose.Schema({
  img: {
    data: Buffer,
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ProfilePics', profilePics);
