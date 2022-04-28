const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Doctors';

const app = express();

// enable CORS
var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
  console.log('connected...')
})


app.use(express.json())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
// })


// const doctorSolr = require('./routes/doctorsSolr')
// app.use('/solr/tutorial_core/doctors', doctorSolr)
//app.get('/solr/doctorsRepository' + `/query?q=f_name:${f_name}`)


// const doctorRouter = require('./routes/doctors')
// app.use('/doctors', doctorRouter)

// const patientRouter = require('./routes/patients')
// app.use('/patients', patientRouter)

// const appointmentRouter = require('./routes/appointments')
// app.use('/appointments', appointmentRouter)

// const patientappoRouter = require('./routes/patientappos')
// app.use('/patientappos', patientappoRouter)

// app.listen(8983, () => {
//   console.log('server started for solr on 8983');
// })
