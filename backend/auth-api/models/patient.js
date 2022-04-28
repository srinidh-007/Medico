const mongoose = require('mongoose');
const ProfilePics = require('./profilePics.js');

const patientSchema = new mongoose.Schema({
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
  // propic: {
  //   type: Object,
  //   ref: ProfilePics,
  // },
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
  blood_group: {
    type: String,
    required: true
  },
  profession: {
    type: String,
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

module.exports = mongoose.model('Patient', patientSchema);
