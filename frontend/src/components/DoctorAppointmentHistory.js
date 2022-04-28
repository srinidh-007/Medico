import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession, getUser } from './../Utils/Common'
import { Button, Card, Modal } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

const DoctorAppointmentHistory = () => {
    const navigate = useNavigate();
    const user = getUser();


    const renderPosts = async () => {
      let container = document.querySelector('#appointments');
      let uri = 'http://localhost:8000/Appointments?docId=' + user.userId + '&_sort=date';
      const res = await fetch(uri);
      const posts = await res.json();
      let template = '';





      for (let post of posts) {
        let docURI = 'http://localhost:8000/doctors/' + user.userId;
        const docRES = await fetch(docURI);
        const docPost = await docRES.json();

        template += `

          <div style="text-align: left; color: black;" class = "row shadow-lg p-5 mb-5 bg-white rounded">
            <div class="col-4">
              <img src="/images/${docPost.profile_img}" height="200px" />
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-4">
                  <p>Patient Name: </p>
                  <p>D.O.B: </p>
                  <p>Appointment Time: </p>
                  <p>Appointment Date: </p>
                  <p>Contact Patient: </p>
                  <p>Patient Location: </p>
                </div>
                <div class="col-4">
                <div>
                  <p>${post.patName}</p>
                  <p>${post.patDOB}</p>
                  <p>${post.time}</p>
                  <p>${post.date}-${post.month}-${post.year}</p>
                  <p>(+91) ${post.patPhone}</p>
                  <p> ${post.patLoc}</p>
                </div>
                </div>

              </div>

              <div style="position: absolute; bottom: 0; right: 0;">
                <button class="btn btn-danger" >Cancel</button>
                <button class="btn btn-primary">View</button>
              </div>
            </div>
          </div>



        `
      };

      container.innerHTML = template;

    }

    window.addEventListener("DOMContentLoaded", () => renderPosts());



    // render posts on initial load
    useEffect(() => {
      renderPosts();
    }, []);

    return (
      <div>
        <div style={{textAlign: "left"}} className="container-sm shadow-lg p-5 mb-5 bg-white rounded">
          <h3 style={{color: "black"}} >Welcome Back, {user.name}! (Check out your upcoming appointments)</h3>

        </div>

        <div className="container" id="appointments">

        </div>

      </div>
    );
  }

  export default DoctorAppointmentHistory;
