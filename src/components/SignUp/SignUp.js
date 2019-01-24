import React from 'react';
import classes from './SignUp.module.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignUpForm from './SignUpForm/SignUpForm';

const signUp = () => {
  return (
    <div className={classes.SignUp}>
      <h1>Sign Up</h1>
      <SignUpForm />
      <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </p>
    </div>
  );
};

export default signUp;
