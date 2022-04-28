import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession, getUser } from '../../Utils/Common';
import DoctorsDetailsStyles from './DoctorsDetails.module.css';
import { Helmet } from 'react-helmet';

const DoctorsDetails = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    navigate('/login');
  }



  const renderDetails = async () => {

    let id = new URLSearchParams(window.location.search).get('id');
    let container = document.querySelector('.details');
    let deleteBtn = document.querySelector('.delete');

    const res = await fetch('http://localhost:8000/doctors/' + id);
    if (!res.ok) {
      window.location.replace("/");
    }
    const post = await res.json();

    const template = `



      <div class="container">
        <img class=${DoctorsDetailsStyles.profile_img} src="/images/${post.profile_img}" />
        <div class=${DoctorsDetailsStyles.name}>
          <h2 >${post.f_name} ${post.l_name}</h2>
          <p>${post.specialization}</p>
        </div>
        <div class=${DoctorsDetailsStyles.row}>
          <div class=${DoctorsDetailsStyles.column}>
            <h2>About User</h2>
            <p>${post.bio}</p>

            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">Delete Profile</button>
          </div>
          <div class="${DoctorsDetailsStyles.col_2} ${DoctorsDetailsStyles.column}">
            <div class=${DoctorsDetailsStyles.row}>
              <div class=${DoctorsDetailsStyles.column}>
                <p><strong>Name: </strong></p>
                <p><strong>Specialization: </strong></p>
                <p><strong>Years Of Experience: </strong></p>
                <p><strong>D.O.B: </strong></p>
                <p><strong>Gender: </strong></p>
                <p><strong>Email: </strong></p>
                <p><strong>Contact: </strong></p>
                <p><strong>City: </strong></p>
                <p><strong>State: </strong></p>
              </div>
              <div class=${DoctorsDetailsStyles.column}>
                <p>${post.f_name} ${post.l_name}</p>
                <p>${post.specialization}</p>
                <p>${post.year_of_exp}</p>
                <p>${post.dob}</p>
                <p>${post.gender}</p>
                <p>${post.email}</p>
                <p>+91 ${post.mobile}</p>
                <p>${post.city}</p>
                <p>${post.state}</p>

              </div>
            </div>
          </div>
        </div>
      </div>

    `

    container.innerHTML = template;
  }



  const deleteRecord = async () => {
    let id = new URLSearchParams(window.location.search).get('id');
    let container = document.querySelector('.details');

    const res = await fetch('http://localhost:8000/doctors/' + id, {
      method: 'DELETE'
    });
    window.location.replace("/doctorsList");

  }



  window.addEventListener('DOMContentLoaded', renderDetails);


document.body.style.backgroundColor = "white";
  return (
    <div>


      <div style={{top: "100px"}} className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 style={{color: "black"}} className="modal-title" id="myModalLabel">Are you sure?</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p style={{color: "black"}} >The user's profile will be deleted permanently.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={deleteRecord}>Delete Profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="details">

      </div>

    </div>
  );
}

export default DoctorsDetails;
