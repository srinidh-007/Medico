const mongoose = require('mongoose');

const patientappoSchema = new mongoose.Schema({
  docId: {
    type: String,
    required: true
  },
  patId: {
    type: String,
    required: true
  },
  docName: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  docMobile: {
    type: String,
    required: true
  },
  docSpecialization: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Patientappos', patientappoSchema);
