import React from 'react';
import { render } from "react-dom";
import { getToken, getUser } from './Common';
import {
  Route,
  Routes,
  Navigate,
  Outlet
} from "react-router-dom";

const IsAdmin = ({ children, ...rest }) => {
  const user = getUser();

  // // If user is logged in
  // if (user) {
  //   //if user is an admin
  //   if (user.isAdmin) {
  //     return children;
  //   }
  // }

  return getToken() ? user.isAdmin ? children : <Navigate  to="/doctors" /> : <Navigate  to="/login" />;
}

export default IsAdmin;
