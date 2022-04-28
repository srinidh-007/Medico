import React from 'react';
import SignupStyle from './SignUp.module.css';

const SignUp = () => {
  return (
    <div>


      <div className={SignupStyle.form_wrapper}>
        <div className={SignupStyle.form_container}>
          <div className={SignupStyle.title_container}>
            <h2>S I G N U P</h2>
          </div>
          <div className={`${SignupStyle.row} ${SignupStyle.clearfix}` }>
            <div className="">
              <form>
                <div className={SignupStyle.input_field}> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                  <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className={SignupStyle.input_field}> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                  <input type="password" name="password" placeholder="Password" required />
                </div>
                <div className={SignupStyle.input_field}> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                  <input type="password" name="password" placeholder="Re-type Password" required />
                </div>
                <div className={`${SignupStyle.row} ${SignupStyle.clearfix}` }>
                  <div className={SignupStyle.col_half}>
                    <div className={SignupStyle.input_field}> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                      <input type="text" name="name" placeholder="First Name" />
                    </div>
                  </div>
                  <div className={SignupStyle.col_half}>
                    <div className={SignupStyle.input_field}> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                      <input type="text" name="name" placeholder="Last Name" required />
                    </div>
                  </div>
                </div>
                  	<div className={`${SignupStyle.input_field} ${SignupStyle.radio_option}` }>
                    <input type="radio" name="radiogroup1" id="rd1" />
                    <label for="rd1">Male</label>
                    <input type="radio" name="radiogroup1" id="rd2" />
                    <label for="rd2">Female</label>
                    </div>

                  <div className={`${SignupStyle.input_field} ${SignupStyle.checkbox_option}` }>
                  	<input type="checkbox" id="cb1" />
          			<label for="cb1">I agree with terms and conditions</label>
                  </div>
                <input className={SignupStyle.button} type="submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className={SignupStyle.credit}>Already have an account? <a href="/login" >sign in</a></p>


    </div>
  );
}

export default SignUp;
