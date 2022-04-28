const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor')
const fs = require('fs');

// get all patients
router.get('/', async(req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch(err) {
    res.send('Error ', err);
  }
});

// get patient by id
router.get(`/select?q=f_name:${f_name}`, async(req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch(err) {
    res.send('Error ', err);
  }
});
