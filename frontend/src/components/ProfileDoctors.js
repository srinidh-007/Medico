import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession, getUser } from './../Utils/Common';
import { Helmet } from 'react-helmet';

const ProfileDoctors = () => {
  const user = getUser();

  const insertUserInfo = async () => {
    let uri = user.isDoctor ? 'http://localhost:8000/doctors/' + user.userId : 'http://localhost:8000/patients/' + user.userId;
    let res = await fetch(uri);
    let posts = await res.json();
    document.querySelector('#f_name').value = posts.f_name;
    document.querySelector('#l_name').value = posts.l_name;
    document.querySelector('#mobile').value = posts.mobile;
    document.querySelector('#email').value = posts.email;
    document.querySelector('#gender').value = posts.gender;
    document.querySelector('#dob').value = posts.dob.split("-")[2] + "-" + posts.dob.split("-")[1] + "-" + posts.dob.split("-")[0];
    document.querySelector('#city_input').value = posts.city;
    document.querySelector('#state_input').value = posts.state;
    document.querySelector('#specialization_input').value = posts.specialization;
    document.querySelector('#year_of_exp').value = posts.year_of_exp;
    document.querySelector('#avg_charge').value = posts.avg_charge;
    document.querySelector('#bio').innerHTML = posts.bio;

    document.querySelector('#profile_img').setAttribute("src", "/images/" + posts.profile_img);
    document.querySelector('#profile_email').innerHTML = posts.email;
  }
  insertUserInfo();



  const CreatePost = async (e) => {
    let uri = user.isDoctor ? 'http://localhost:8000/doctors/' + user.userId : 'http://localhost:8000/patients/' + user.userId;
    let res = await fetch(uri);
    let posts = await res.json();

    const doc = {
      password: posts.password,
      f_name: document.querySelector('#f_name').value,
      l_name: document.querySelector('#l_name').value,
      email: document.querySelector('#email').value,
      user_name: posts.user_name,
      profile_img:  posts.profile_img,
      gender: document.querySelector('#gender').value,
      mobile: document.querySelector('#mobile').value,
      dob: document.querySelector('#dob').value.split("-")[2] + "-" + document.querySelector('#dob').value.split("-")[1] + "-" + document.querySelector('#dob').value.split("-")[0],
      city: document.querySelector('#city_input').value,
      state: document.querySelector('#state_input').value,
      avg_charge: document.querySelector('#avg_charge').value,
      specialization: document.querySelector('#specialization_input').value,
      year_of_exp: document.querySelector('#year_of_exp').value,
      is_admin: posts.is_admin,
      is_doctor: posts.is_doctor,
      bio: document.querySelector('#bio').innerHTML,
    }

    await fetch(uri, {
      method: 'PUT',
      body: JSON.stringify(doc),
      headers: { 'Content-Type': 'application/json' }
    })

    window.location.replace('/profile')
  }

  return (
    <div>

    <Helmet>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
      <link rel="stylesheet" href="bootprofile.css" />
    </Helmet>

    <div style={{top: "100px"}} className="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 style={{color: "black", fontSize: "20px"}} className="modal-title" id="myModalLabel">Are you sure?</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span style={{fontSize: "20px"}} aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p style={{color: "black", fontSize: "16px"}}>The user's profile will be updated.</p>
          </div>
          <div className="modal-footer">
            <button style={{fontSize: "14px"}} type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            <button style={{backgroundColor: "blue", fontSize: "14px"}} type="button" className="btn btn-primary" onClick={CreatePost}>Update</button>
          </div>
        </div>
      </div>
    </div>


    <main class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img id="profile_img" class="rounded mt-2" src="/images/female_avatar_red.svg" width="250px" heidht="250px" /><span style={{fontSize: "24px"}} class="font-weight-bold">{user.name}</span><span style={{fontSize: "14px"}} id="profile_email" class="text-black-50"></span><span> </span></div>
                <h4 class="labels">About</h4>
                <div style={{fontSize: "14px", border: "ridge 2px", padding: "5px", minHeight: "5em", overflow: "auto", boxShadow: "10px 10px 10px 1px whitesmoke"}} id="bio"  spellcheck="false" contentEditable></div>

            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Firstname</label><input id="f_name" name="f_name" type="text" class="form-control" placeholder="first name"  /></div>
                        <div class="col-md-6"><label class="labels">Lastname</label><input id="l_name" name="l_name" type="text" class="form-control"  placeholder="lastname" /></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">Phone Number (+91)</label><input id="mobile" name="mobile" type="text" class="form-control" placeholder="enter phone number"  /></div>
                        <div class="col-md-12"><label class="labels">Email ID</label><input id="email" name="email" type="text" class="form-control" placeholder="enter email id"  /></div>
                        <div class="col-md-12"><label class="labels">Gender</label>

                        <select style={{minHeight: "30px"}} id="gender" class="form-control" name="gender">
                          <option disabled selected value> -- select an option -- </option>
                          <option value="Male" >Male</option>
                          <option value="Female">Female</option>
                          <option value="Not Disclosed" >Do Not Disclose</option>
                        </select> <br />
                        </div>
                        <div class="col-md-12"><label class="labels">D.O.B</label><input id="dob" name="dob" type="date" class="form-control"  /></div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6"><label class="labels">City</label>
                        <form>
                        <input id="city_input" class="form-control" list="city" name="city" />
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
                        </datalist>
                        </form>
                        </div>
                        <div class="col-md-6"><label class="labels">State/Region</label>
                        <form>
                        <input id="state_input" class="form-control" list="state" name="state" />
                        <datalist id="state">
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Telangana">Telangana</option>

                        </datalist>
                        </form>
                        </div>
                    </div>
                    <div class="mt-5 text-center"><button data-toggle="modal" data-target="#createModal" style={{position:"absolute", bottom: "30px", left:"30px", width: "420px"}} class="btn btn-primary profile-button btn-block" type="button">Save Profile</button></div>

                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><button data-toggle="modal" data-target="#createModal" class="btn btn-primary btn-lg add-experience"><i class="fa fa-plus"></i>&nbsp;Update</button></div><br />
                    <div class="col-md-12">
                    <form>
                    <label class="labels" for="specialization">Specialization:</label> <br />
                    <input id="specialization_input" class="form-control" list="specialization" name="specialization" />
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
                    </form>
                    </div>
                    <div class="col-md-12"><label class="labels">Years of Experience </label><input id="year_of_exp" name="year_of_exp" type="text" class="form-control" placeholder="experience"  /></div>
                    <div class="col-md-12"><label class="labels">Average fee charged per hour</label><input id="avg_charge" name="avg_charge" type="number" class="form-control"  /></div> <br />

                </div>
            </div>
        </div>
    </main>

    </div>
  );
}

export default ProfileDoctors;
