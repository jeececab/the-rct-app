import React from 'react'
import classes from './PasswordForget.module.css';
import PasswordForgetForm from './PasswordForgetForm/PasswordForgetForm';

const passwordForget = () => (
  <div className={classes.PasswordForget}>
    <h1>Password reset</h1>
    <PasswordForgetForm />
  </div>
);

export default passwordForget