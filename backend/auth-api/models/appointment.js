const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  docId: {
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
  patName: {
    type: String,
    required: true
  },
  patEmail: {
    type: String,
    required: true
  },
  patPhone: {
    type: String,
    required: true
  },
  patDOB: {
    type: String,
    required: true
  },
  patAge: {
    type: String,
    required: true
  },
  patLoc: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Appointment', appointmentSchema);
