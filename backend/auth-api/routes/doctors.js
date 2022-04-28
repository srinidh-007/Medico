const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor')
const Redis = require('redis')
const fs = require('fs')
const DEFAULT_EXPIRATION = 3600;
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })


const store = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'./upload')
  },
  filename: function(req,file,cb){
      cb(null, file.originalname)
  }
})

const upload = multer({storage:store})

// get all doctors

router.get('/', async(req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch(err) {
    res.status(400).send(err);
  }
});


// get doctor by id
router.get('/:id', async(req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch(err) {
    res.status(400).send(err);
  }
});



// create a doctor
router.post('/', upload.single('propic'), async(req, res, next) => {
  const doctor = new Doctor({
    password: req.body.password,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    // propicfileName: '/upload/' + req.file.filename,
    // propicOriName: '/upload' + req.file.originalname,
    user_name: req.body.user_name,
    profile_img: req.body.profile_img,
    gender: req.body.gender,
    mobile: req.body.mobile,
    dob: req.body.dob,
    city: req.body.city,
    state: req.body.state,
    avg_charge: req.body.avg_charge,
    specialization: req.body.specialization,
    year_of_exp: req.body.year_of_exp,
    is_admin: req.body.is_admin,
    is_doctor: req.body.is_doctor,
    bio: req.body.bio
  })

  try {
    const d1 = await doctor.save();
    res.json(d1);
  } catch(err) {
    res.status(400).send(err);
  }
});

// update doctor details by id
router.put('/:id', async(req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    doctor.password = req.body.password,
    doctor.f_name = req.body.f_name,
    doctor.l_name = req.body.l_name,
    doctor.email = req.body.email,
    doctor.user_name = req.body.user_name,
    doctor.profile_img = req.body.profile_img,
    doctor.gender = req.body.gender,
    doctor.mobile = req.body.mobile,
    doctor.dob = req.body.dob,
    doctor.city = req.body.city,
    doctor.state = req.body.state,
    doctor.avg_charge = req.body.avg_charge,
    doctor.specialization = req.body.specialization,
    doctor.year_of_exp = req.body.year_of_exp,
    doctor.is_admin = req.body.is_admin,
    doctor.is_doctor = req.body.is_doctor,
    doctor.bio = req.body.bio

    const d1 = await doctor.save();
    res.json(d1);

  } catch(err) {
    res.status(400).send(err);
  }
});

// delete a doctor by id
router.delete('/:id', async(req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    const d1 = await doctor.delete();
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
      tutorialName="doctors";
      }else{
      tutorialName = "doctors/"+str(title);
      }
      var condition = title ? { f_name: { $regex: new RegExp(title), $options: "i" } } : {}; 

       const doctors = await getOrSetCache(tutorialName, condition, async (req, res, condition)=>{
          const data = await Doctor.find(condition);
          return data
        })
        res.json(doctors);

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
