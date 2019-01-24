import React from 'react';
import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignInForm from './SignInForm/SignInForm';

const signIn = () => {
  return (
    <div className={classes.SignIn}>
      <h1>Sign In</h1>
      <SignInForm />
      <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
      <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
      </p>
    </div>
  );
};

export default signIn;
