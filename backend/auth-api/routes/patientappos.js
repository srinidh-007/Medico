const express = require('express');
const router = express.Router();
const Patientappo = require('../models/patientappo')

// get all appointments
router.get('/', async(req, res) => {
  try {
    const patientappos = await Patientappo.find();
    res.json(patientappos);
  } catch(err) {
    res.status(400).send(err);
  }
});

// get appointment by id
router.get('/:id', async(req, res) => {
  try {
    const patientappo = await Patientappo.findById(req.params.id);
    res.json(patientappo);
  } catch(err) {
    res.status(400).send(err);
  }
});

// create an appointment
router.post('/', async(req, res) => {
  const patientappo = new Patientappo({
    docId: req.body.docId,
    patId: req.body.patId,
    docName: req.body.docName,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    time: req.body.time,
    docMobile: req.body.docMobile,
    docSpecialization: req.body.docSpecialization
  })

  try {
    const d1 = await patientappo.save();
    res.json(d1);
  } catch(err) {
    res.status(400).send(err);
  }
});


// router.put('/:id', async(req, res) => {
//   try {
//     const patientappo = await Patientappo.findById(req.params.id);
//     patientappo.docId = req.body.docId,
//     patientappo.patId = req.body.patId,
//     patientappo.docName = req.body.docName,
//     patientappo.date = req.body.date,
//     patientappo.month = req.body.month,
//     patientappo.year = req.body.year,
//     patientappo.time = req.body.time,
//     patientappo.docMobile = req.body.docMobile,
//     patientappo.docSpecialization = req.body.docSpecialization

//     const d1 = await patientappo.save();
//     res.json(d1);

//   } catch(err) {
//     res.status(400).send(err);
//   }
// });

// delete an appointment by id
router.delete('/:id', async(req, res) => {
  try {
    const patientappo = await Patientappo.findById(req.params.id);
    const d1 = await patientappo.delete();
    res.json(d1);

  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;
