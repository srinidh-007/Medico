import React from 'react';
import { render } from "react-dom";
import { getToken, getUser } from './../Utils/Common';
import {
  Route,
  Routes,
  Navigate,
  Outlet
} from "react-router-dom";
import ProfilePatients from "./ProfilePatients"
import ProfileDoctors from "./ProfileDoctors"

const Profile = () => {
  const user = getUser();

  return user.isDoctor ? <ProfileDoctors /> : <ProfilePatients />
}

export default Profile;
