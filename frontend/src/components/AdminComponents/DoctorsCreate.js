import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession, getUser } from '../../Utils/Common';
import DoctorsCreateStyles from './DoctorsCreate.module.css';
import { Helmet } from 'react-helmet';

const DoctorsCreate = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    navigate('/login');
  }




  const CreatePost = async (e) => {
    let form = document.querySelector('form');
    e.preventDefault();

    const colors = ["red", "blue", "green", "yellow"];
    let profile_img = ""
    if (form.gender.value == "Male") {
      profile_img = "male_avatar_" + colors[Math.floor(Math.random() * colors.length)] + ".svg"
    } else {
      profile_img = "female_avatar_" + colors[Math.floor(Math.random() * colors.length)] + ".svg"
    }


    const doc = {
      password: form.pwd.value,
      f_name: form.f_name.value,
      l_name: form.l_name.value,
      email: form.email.value,
      user_name: form.user_name.value,
      profile_img: profile_img,
      gender: form.gender.value,
      mobile: form.mobile.value,
      dob: form.dob.value.split('-')[2] + "-" + form.dob.value.split('-')[1] + "-" + form.dob.value.split('-')[0],
      city: form.city.value,
      state: form.state.value,
      avg_charge: form.avg_charge.value,
      specialization: form.specialization.value,
      year_of_exp: form.year_of_exp.value,
      is_admin: false,
      is_doctor: true,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis dictum lobortis. Sed at nisi non velit elementum consectetur. Proin velit justo, mollis iaculis turpis sit amet, tincidunt lobortis nulla. Mauris volutpat tempor massa, sed rhoncus diam vehicula sit amet. Proin dolor enim, ultrices ac neque ac, imperdiet hendrerit sem. In feugiat risus non accumsan interdum. Aliquam orci purus, iaculis sit amet interdum et, pretium eu augue. Duis convallis facilisis nulla, eu molestie sem tincidunt ut. Suspendisse auctor odio ac pharetra sagittis. Nulla facilisi. Pellentesque sit amet sem sed sapien finibus pretium. Morbi porta dignissim cursus. Etiam sodales metus non suscipit fringilla. Nullam pretium ullamcorper turpis. Sed lacinia sagittis nisi tempor auctor. Cras luctus lorem nec varius tristique.",
    }

    await fetch('http://localhost:8000/doctors', {
      method: 'POST',
      body: JSON.stringify(doc),
      headers: { 'Content-Type': 'application/json' }
    })

    window.location.replace('/doctorsList')
  }



document.body.style.backgroundColor = "white";
  return (
    <div>
      <input type="hidden" name="_csrf" value="<%= csrfToken %>"></input>
    <div style={{top: "100px"}} className="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 style={{color: "black"}} className="modal-title" id="myModalLabel">Are you sure?</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p style={{color: "black"}}>The user's profile will be created.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            <button style={{backgroundColor: "blue"}} type="button" className="btn btn-primary" onClick={CreatePost}>Create Profile</button>
          </div>
        </div>
      </div>
    </div>



    <div className={DoctorsCreateStyles.row}>
      <div className={DoctorsCreateStyles.column}>
        <img src="/images/add_doctor_bg.svg" alt="" />


      </div>
      <form>
        <div className={DoctorsCreateStyles.column}>
          <div className={DoctorsCreateStyles.row}>
            <div className={DoctorsCreateStyles.column}>
              <label for="f_name">First Name:</label> <br />
              <input type="text" name="f_name" placeholder="First Name" /> <br />

              <label for="user_name">Username:</label> <br />
              <input type="text" name="user_name" placeholder="username" /> <br />

              <label for="pwd">Password:</label> <br />
              <input type="password" name="pwd" placeholder="******" /> <br />

              <label for="specialization">Specialization:</label> <br />
              <input list="specialization" name="specialization" />
              <datalist id="specialization">
                <option value="Orthopedics">Orthopedics</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Radiology">Radiology</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Family Medicine">Family Medicine</option>
                <option value="Chest Medicine">Chest Medicine</option>
                <option value="Anesthesia">Anesthesia</option>
                <option value="Pathology">Pathology</option>
                <option value="ENT">ENT</option>

              </datalist> <br />

              <label for="avg_charge">Average Charge Per Hour:</label> <br />
              <input type="number" name="avg_charge" placeholder="₹" /> <br />

              <label for="dob">D.O.B:</label> <br />
              <input type="date" name="dob" /> <br />

              <label for="city">City:</label> <br />
              <input list="city" name="city" />
              <datalist id="city">
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
                <option value="Salem">Salem</option>
                <option value="Erode">Erode</option>
                <option value="Karur">Karur</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="Kadapa">Kadapa</option>
                <option value="Tirupati">Tirupati</option>
                <option value="Chittoor">Chittoor</option>
                <option value="Nellore">Nellore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Warangal">Warangal</option>


              </datalist> <br />


            </div>
            <div className={DoctorsCreateStyles.column}>
              <label for="l_name">Last Name:</label> <br />
              <input type="text" name="l_name" placeholder="Last Name" /> <br />

              <label for="email">Email:</label> <br />
              <input type="email" name="email" placeholder="user@example.com" /> <br />

              <label for="conf_pwd">Confirm Password:</label> <br />
              <input type="password" name="conf_pwd" placeholder="******" /> <br />

              <label for="year_of_exp">Years Of Experience:</label> <br />
              <input type="number" name="year_of_exp" /> <br />

              <label for="mobile">Phone Number:</label> <br />
              <input type="text" name="mobile" placeholder="+91" /> <br />

              <label for="gender">Gender:</label> <br />
              <select name="gender">
                <option disabled selected value> -- select an option -- </option>
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
                <option value="Not Disclosed" >Not Disclosed</option>
              </select> <br />





              <label for="state">State:</label> <br />
              <input list="state" name="state" />
              <datalist id="state">
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>

              </datalist> <br />




            </div>
          </div>


        </div>
      </form>
    </div>

  <div className={`container ${DoctorsCreateStyles.buttons}`}>
    <div className={DoctorsCreateStyles.row}>
      <div className={DoctorsCreateStyles.column}>
        <a className={DoctorsCreateStyles.back_btn} href="/doctorsList"><button type="button" className={`${DoctorsCreateStyles.btn} ${DoctorsCreateStyles.btn_danger} btn btn-outline-danger btn-block`}>←back</button></a>
        <button type="button" className={`btn ${DoctorsCreateStyles.btn} ${DoctorsCreateStyles.btn_primary}  btn-outline-primary btn-block`} data-toggle="modal" data-target="#createModal">Save</button>
      </div>

    </div>

  </div>

    </div>
  );
}

export default DoctorsCreate;
