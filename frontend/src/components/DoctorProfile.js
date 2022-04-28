import { useParams } from "react-router-dom";
import doctors from '../../src/assets/doctors.json';
import AppointmentForm from "./AppointmentForm";
import Doctor from './Doctor';
import './DoctorProfile.css'


const DoctorProfile = (props)=>{
    const {id} = useParams()
    const doctor = doctors["doctors"].filter((doc)=>doc.id==id)

    return(
        <>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>

        <div>
            <center>
            <h1>Know About your Doctor</h1>
            <Doctor docData={doctor[0]} len={true} />
            <br/>
            <div className="container bg-image" style={{ borderRadius:"10px", border:"solid 2px #6CEBFF", margin:"30px", }}>
            <h2 style={{ color:"orange", }}>Fill the below form to get Appointment!!</h2>
            <AppointmentForm doc={doctor[0]} docId= {doctor.id} docName= { doctor[0].f_name } />
            </div>
            </center>
        </div>
        </>
    )
}

export default DoctorProfile;
