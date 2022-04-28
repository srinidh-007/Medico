const express = require('express');
const router = express.Router();
const Redis = require('redis')
const Patient = require('../models/patient')
const fs = require('fs');
const multer  = require('multer');
// const profilePics = require('../models/profilePics');
// const upload = multer({ dest: 'uploads/' })

const DEFAULT_EXPIRATION = 3600;

const store = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'./upload')
  },
  filename: function(req,file,cb){
      cb(null, file.originalname)
  }
})

const upload = multer({storage:store})

// get all patients
router.get('/', async(req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch(err) {
    res.status(400).send(err);
  }
});

// get patient by id
router.get('/:id', async(req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch(err) {
    res.status(400).send(err);
  }
});

// create a patient
router.post('/', upload.single('propic'), async(req, res, next) => {
  // const newImage = new profilePics()
  // newImage.img.data = fs.readFileSync(req.file.filename);
  // newImage.img.type = 'image/png';
  // newImage.save();

  const patient = new Patient({
    password: req.body.password,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    // propic: newImage,
    // propicfileName: '/upload/' + req.file.filename,
    // propicOriName: '/upload' + req.file.originalname,
    user_name: req.body.user_name,
    profile_img: req.body.profile_img,
    gender: req.body.gender,
    mobile: req.body.mobile,
    dob: req.body.dob,
    city: req.body.city,
    state: req.body.state,
    blood_group: req.body.blood_group,
    profession: req.body.profession,
    is_admin: req.body.is_admin,
    is_doctor: req.body.is_doctor,
    bio: req.body.bio
  })

  try {
    const d1 = await patient.save();
    res.json(d1);
  } catch(err) {
    res.status(400).send(err);
  }
});

// update patient details by id
router.put('/:id', async(req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    patient.password = req.body.password,
    patient.f_name = req.body.f_name,
    patient.l_name = req.body.l_name,
    patient.email = req.body.email,
    patient.user_name = req.body.user_name,
    patient.profile_img = req.body.profile_img,
    patient.gender = req.body.gender,
    patient.mobile = req.body.mobile,
    patient.dob = req.body.dob,
    patient.city = req.body.city,
    patient.state = req.body.state,
    patient.blood_group = req.body.blood_group,
    patient.profession = req.body.profession,
    patient.is_admin = req.body.is_admin,
    patient.is_doctor = req.body.is_doctor,
    patient.bio = req.body.bio

    const d1 = await patient.save();
    res.json(d1);

  } catch(err) {
    res.status(400).send(err);
  }
});

// delete a patient by id
router.delete('/:id', async(req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    const d1 = await patient.delete();
    res.json(d1);

  } catch(err) {
    res.status(400).send(err);
  }
});


router.get('/redis', async(req, res) => {
  const redisClient = Redis.createClient()
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await redisClient.connect();
  try {
      var title = req.query.title;
      // console.log(req.query);
      var tutorialName = "";

      if (title == null) {
      tutorialName="patients";
      }else{
      tutorialName = "patients/"+str(title);
      }
      var condition = title ? { f_name: { $regex: new RegExp(title), $options: "i" } } : {}; 

       const doctors = await getOrSetCache(tutorialName, condition, async (req, res, condition)=>{
          const data = await Patient.find(condition);
          return data
        })
        res.json(patients);

  } catch(err) {
      res.status(400).send(err);
    }
}
);

function  getOrSetCache(key, condition, cb){
  return new Promise((res, rej)=>{
    redisClient.get(key, async (err, data)=>{
      if (err) return rej(err)
      if (data !=null) return res(JSON.parse(data))
      const freshData = await cb(condition)
      redisClient.setex(key, DEFAULT_EXPIRATION, freshData)
      res.json(freshData)
    })
  })
}

module.exports = router;
