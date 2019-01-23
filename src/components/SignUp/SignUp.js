import React from 'react';
import classes from './SignUp.module.css';
import SignUpForm from './SignUpForm/SignUpForm';

const signUp = () => {
  return (
    <div className={classes.SignUp}>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default signUp;
