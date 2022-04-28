import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserSession, getUser } from '../Utils/Common';
import LoginStyle from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios.post("http://localhost:4000/users/signin", {
      username: username,
      password: password
    }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);

      // redirecting user based on admin access
      const user = getUser();
      if (user.isAdmin) {
        navigate('/doctorsList');
      } else {
        navigate('/doctors');
      }


    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401 || error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    });
  }


  return (

    <div className={LoginStyle.wrap}>
    <div className={LoginStyle.logo}>

    </div>
    <div className={`${LoginStyle.box} ${LoginStyle.bg_img}`}>
      <div className={LoginStyle.content}>

        <h2>Sign<span className={LoginStyle.login_span}> In</span></h2>

        <div className={LoginStyle.forms}>

          <div className={LoginStyle.user_input}>
            <input
              type="text" className={LoginStyle.login_input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username" id="name" required
            />
            <i className="fas fa_user"></i>
          </div>

          <div className={LoginStyle.pass_input}>
            <input
              type="password" className={LoginStyle.login_input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password" id="my_password" required
            />

            <span className={`${LoginStyle.eye} ${LoginStyle.login_span}`} onClick="myFunction()">
              <i id="hide-1" className="fas fa_eye_slash"></i>
              <i id="hide-2" className="fas fa_eye"></i>
            </span>
          </div>

        </div>

        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <input
          className={LoginStyle.login_btn}
          type="button"
          value={loading ? "Loading..." : "Login"}
          disabled={loading}
          onClick={handleLogin}
        />

        <p className={LoginStyle.new_account}>Not a member? <a href="/signup">Sign Up now!</a></p>

        <br />

        <p className={LoginStyle.f_pass}>
          <a href="#">Forget password?</a>
        </p>

      </div>
    </div>
    </div>




  );
}

export default Login;
