const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment')

// get all patient appointments
router.get('/', async(req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch(err) {
    res.status(400).send(err);
  }
});

// get patient appointment by appointment id
router.get('/:id', async(req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.json(appointment);
  } catch(err) {
    res.status(400).send(err);
  }
});

// create a patient appointment
router.post('/', async(req, res) => {
  const appointment = new Appointment({
    docId: req.body.docId,
    docName: req.body.docName,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    time: req.body.time,
    patName: req.body.patName,
    patEmail: req.body.patEmail,
    patPhone: req.body.patPhone,
    patDOB: req.body.patDOB,
    patAge: req.body.patAge,
    patLoc: req.body.patLoc,
  })

  try {
    const d1 = await appointment.save();
    res.json(d1);
  } catch(err) {
    res.status(400).send(err);
  }
});


// router.put('/:id', async(req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id);
//     appointment.docId = req.body.docId,
//     appointment.docName = req.body.docName,
//     appointment.date = req.body.date,
//     appointment.month = req.body.month,
//     appointment.year = req.body.year,
//     appointment.time = req.body.time,
//     appointment.patName = req.body.patName,
//     appointment.patEmail = req.body.patEmail,
//     appointment.patPhone = req.body.patPhone,
//     appointment.patDOB = req.body.patDOB,
//     appointment.patAge = req.body.patAge,
//     appointment.patLoc = req.body.patLoc

//     const d1 = await appointment.save();
//     res.json(d1);

//   } catch(err) {
//     res.status(400).send(err);
//   }
// });

// delete a patient appointment by id
router.delete('/:id', async(req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    const d1 = await appointment.delete();
    res.json(d1);

  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;
