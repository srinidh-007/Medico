import './App.css';
import {BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import CommonDashboard from './components/CommonDashboard';
import Menubar from './components/Menubar';
import {FooterContainer} from './containers/footer'
import Home from './components/Home';
import Profile from './components/Profile';
import DoctorProfile from './components/DoctorProfile'
import AppointmentList from './components/appointmentlist';
import DoctorAppointmentHistory from './components/DoctorAppointmentHistory';

import Login from './components/Login';
import Logout from './components/Logout';
import SignUp from './components/SignUp';
import DoctorsList from './components/AdminComponents/DoctorsList';
import DoctorsDetails from './components/AdminComponents/DoctorsDetails';
import DoctorsCreate from './components/AdminComponents/DoctorsCreate';
import PatientsList from './components/AdminComponents/PatientsList';
import PatientsDetails from './components/AdminComponents/PatientsDetails';
import PublicRoute from './Utils/PublicRoute';
import PrivateRoute from './Utils/PrivateRoute';
import IsAdmin from './Utils/IsAdmin';


function App() {
  return (
    <div className="App">

    <Router>

      <Routes>
      <Route path="/" element={<PublicRoute> <Home/> </PublicRoute>} />

      <Route path = "/doctors" exact element={ <PrivateRoute> <Menubar /> <CommonDashboard/> <FooterContainer /> </PrivateRoute> } />
      <Route path="/:id/details" exact element={<PrivateRoute> <Menubar /> <DoctorProfile/> <FooterContainer /> </PrivateRoute>}/>
      <Route path="/appointments" exact element={ <PrivateRoute> <Menubar /> <AppointmentList/> <FooterContainer /> </PrivateRoute>  }/>
      <Route path="/history" exact element={ <PrivateRoute> <Menubar /> <DoctorAppointmentHistory/> <FooterContainer /> </PrivateRoute>  }/>
      <Route path="/login" element={<PublicRoute> <Menubar /> <Login /> </PublicRoute>} />
      <Route path="/logout" element={<PrivateRoute> <Logout /> </PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute> <Menubar /> <Profile /> <FooterContainer /> </PrivateRoute>} />
      <Route path="/signup" element={<PublicRoute> <Menubar /> <SignUp /> </PublicRoute>} />
      
      <Route path="/doctorsList" element={<IsAdmin> <Menubar /> <DoctorsList /> </IsAdmin>} />
      <Route path="/doctorsList/details" element={<IsAdmin> <Menubar /> <DoctorsDetails /> </IsAdmin>} />
      <Route path="/doctorsList/create" element={<IsAdmin> <Menubar /> <DoctorsCreate /> </IsAdmin>} />
      <Route path="/patientsList" element={<IsAdmin> <Menubar /> <PatientsList /> </IsAdmin>} />
      <Route path="/patientsList/details" element={<IsAdmin> <Menubar /> <PatientsDetails /> </IsAdmin>} />

      </Routes>

      </Router>

    </div>
  );
}

export default App;
