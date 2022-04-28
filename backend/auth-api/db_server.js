const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Doctors';

const app = express();

var morgan = require('morgan')
const fsr = require('file-stream-rotator');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfpr = csrf({cookie:true});
app.use(cookieParser());
const bparser = require('body-parser')
app.use(bparser.urlencoded({extended:false}))

let logsinfo = fsr.getStream({filename:"logs/db_server.log", frequency:'60m', verbose: true});
app.use(morgan('dev', {stream: logsinfo}))

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

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);

app.use(express.json())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
// })

const doctorRouter = require('./routes/doctors')
app.use('/doctors', doctorRouter)

const patientRouter = require('./routes/patients')
app.use('/patients', patientRouter)

const appointmentRouter = require('./routes/appointments')
app.use('/appointments', appointmentRouter)

const patientappoRouter = require('./routes/patientappos')
app.use('/patientappos', patientappoRouter)

app.listen(8000, () => {
  console.log('server started');
})

module.exports = app;