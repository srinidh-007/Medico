const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  f_name: {
    type: String,
    required: true
  },
  l_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  profile_img: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  avg_charge: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  year_of_exp: {
    type: Number,
    required: true
  },
  is_admin: {
    type: Boolean,
    required: true
  },
  is_doctor: {
    type: Boolean,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Doctor', doctorSchema);
