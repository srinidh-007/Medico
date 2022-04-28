import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession, getUser } from '../../Utils/Common';
import { Helmet } from 'react-helmet';
const csrf = require('csurf');
const csrfpr = csrf({cookie:true});

const DoctorsList = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    navigate('/login');
  }


  const updateCount = async () => {
    let uri = 'http://localhost:8000/doctors';
    let res = await fetch(uri);
    let posts = await res.json();
    let container = document.querySelector('#doctors_count');
    container.innerHTML = posts.length;
    let footer_container = document.querySelector('#footer_doctors_count');
    footer_container.innerHTML = posts.length;

    uri = 'http://localhost:8000/patients';
    res = await fetch(uri);
    posts = await res.json();
    container = document.querySelector('#patients_count');

    container.innerHTML = posts.length;


  }
  updateCount();



  const renderingPosts = async (term) => {
    let container = document.querySelector('#doctors');


    let uri = 'http://localhost:8983/solr/doctorsRepository';
    if (term) {
      uri += `/query?q=f_name:${term}&l_name:${term}&user_name:${term}&specialization:${term}&city:${term}&state:${term}&q.op=OR&indent=true`
    }else{
        uri+= `/query?q=*:*&q.op=OR&indent=true`
    }

    const res = await fetch(uri);


    const result = await res.json();
    const posts = result['response']['docs']


    let template = '';
    posts.forEach(post => {
      template += `



      <tr>
          <td>
              <img alt="..." src="/images/${post.profile_img}" class="avatar avatar-sm rounded-circle me-2" />
              <a href="/doctorsList/details?id=${post._id}" class="text-heading text-heading-name font-semibold" >
                  ${post.f_name} ${post.l_name}
              </a>
          </td>
          <td>
              ${post.email}
          </td>
          <td>

              <a class="text-heading font-semibold" href="#">
                  ${post.specialization}
              </a>
          </td>
          <td>
              ${post.year_of_exp}
          </td>
          <td>
              <span class="badge badge-lg badge-dot">
                  <i class="bg-success"></i>${post.city}, ${post.state}
              </span>
          </td>
          <td class="text-end">
              <a href="/doctorsList/details?id=${post._id}" class="btn btn-sm btn-neutral">View</a>
          </td>
      </tr>



      `
    });

    container.innerHTML = template;

  }



  const renderPosts = async (term) => {
    let container = document.querySelector('#doctors');
    let uri = 'http://localhost:8000/doctors';
    if (term) {
      uri += `?q=${term}`
    }



    const res = await fetch(uri);

    const posts = await res.json();



    let template = '';
    posts.forEach(post => {
      template += `



      <tr>
          <td>
              <img alt="..." src="/images/${post.profile_img}" class="avatar avatar-sm rounded-circle me-2" />
              <a href="/doctorsList/details?id=${post._id}" class="text-heading text-heading-name font-semibold" >
                  ${post.f_name} ${post.l_name}
              </a>
          </td>
          <td>
              ${post.email}
          </td>
          <td>

              <a class="text-heading font-semibold" href="#">
                  ${post.specialization}
              </a>
          </td>
          <td>
              ${post.year_of_exp}
          </td>
          <td>
              <span class="badge badge-lg badge-dot">
                  <i class="bg-success"></i>${post.city}, ${post.state}
              </span>
          </td>
          <td class="text-end">
              <a href="/doctorsList/details?id=${post._id}" class="btn btn-sm btn-neutral">View</a>
          </td>
      </tr>



      `
    });

    container.innerHTML = template;

  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchForm = document.querySelector('.search');
    renderPosts(searchForm.term.value.trim());
  }

  window.addEventListener("DOMContentLoaded", () => renderPosts());



  // render posts on initial load
  useEffect(() => {
    renderPosts();
  }, []);


  return (
    <div>


    <Helmet>
      <link rel="stylesheet" href="DoctorsList.css" />
    </Helmet>


      <div className="main-div d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">


          <div className="h-screen flex-grow-1 overflow-y-lg-auto">

              <header className="header bg-surface-primary border-bottom pt-6">
                  <div className="container-fluid">
                      <div className="mb-npx">
                          <div className="row align-items-center">
                              <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                  <h1 className="h2 mb-0 ls-tight">Admin Panel</h1>
                              </div>

                              <div className="create-button col-sm-6 col-12 text-sm-end">
                                  <div className="mx-n1">
                                      <a href="/doctorsList/create" csrfpr className="btn d-inline-flex btn-sm btn-primary mx-1">
                                          <span className=" pe-2">
                                              <i className="bi bi-plus"></i>
                                          </span>
                                          <span>Create</span>
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <ul className="nav nav-tabs mt-4 overflow-x border-0">
                              <li className="nav-item ">
                                  <a href="/doctorsList" className="nav-link active">Doctors</a>
                              </li>
                              <li className="nav-item">
                                  <a href="/patientsList" className="nav-link font-regular">Patients</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </header>


              <main className="py-6 bg-surface-secondary">
                  <div className="container-fluid">
                      <div className="row g-6 mb-6">
                          <div className="col-xl-3 col-sm-6 col-12">
                              <div className="card shadow border-0">
                                  <div className="card-body">
                                      <div className="row">
                                          <div className="col">
                                              <span className="h6 font-semibold text-muted text-sm d-block mb-2">No. of Doctors</span>
                                              <span id="doctors_count" className="h3 font-bold mb-0"></span>
                                          </div>
                                          <div className="col-auto">
                                              <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                                  <i className="bi bi-people"></i>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="mt-2 mb-0 text-sm">
                                          <span className="badge badge-pill bg-soft-success text-success me-2">
                                              <i className="bi bi-check-circle me-1"></i><span className="text-nowrap text-xs text-muted">Registered users</span>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-xl-3 col-sm-6 col-12">
                              <div className="card shadow border-0">
                                  <div className="card-body">
                                      <div className="row">
                                          <div className="col">
                                              <span className="h6 font-semibold text-muted text-sm d-block mb-2">No. of Patients</span>
                                              <span id="patients_count" className="h3 font-bold mb-0"></span>
                                          </div>
                                          <div className="col-auto">
                                              <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                  <i className="bi bi-people"></i>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="mt-2 mb-0 text-sm">
                                      <span className="badge badge-pill bg-soft-success text-success me-2">
                                          <i className="bi bi-check-circle me-1"></i><span className="text-nowrap text-xs text-muted">Registered users</span>
                                      </span>
                                      </div>
                                  </div>
                              </div>
                          </div>


                      </div>
                      <div className="card shadow border-0 mb-7">
                          <div className="card-header">
                              <h5 className="search-head mb-0">Doctors Registered</h5>
                              <form className="search">
                              <input className="search-input" type="text" placeholder="Search here" name="term" onChange={handleSearch} />
                              </form>
                          </div>
                          <div className="table-responsive">
                              <table className="table table-hover table-nowrap">
                                  <thead className="thead thead-light">
                                      <tr>
                                          <th scope="col">Name</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">Specialization</th>
                                          <th scope="col">Years of experience</th>
                                          <th scope="col">Location</th>
                                          <th></th>
                                      </tr>
                                  </thead>
                                  <tbody id="doctors">


                                  </tbody>
                              </table>
                          </div>
                          <div className="card-footer border-0 py-5">
                              <p className="text-muted text-sm">Showing items out of <span id="footer_doctors_count"></span> results found</p>
                          </div>
                      </div>
                  </div>
              </main>
          </div>
      </div>


    </div>
  );
}

export default DoctorsList;
