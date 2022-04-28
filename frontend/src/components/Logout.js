import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession, getUser } from '../Utils/Common';

const Logout = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    navigate('/login');
  }

  handleLogout();

  window.location.reload(false);


}

export default Logout;
