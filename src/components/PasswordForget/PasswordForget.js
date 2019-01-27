import React from 'react'
import classes from './PasswordForget.module.css';
import PasswordForgetForm from './PasswordForgetForm/PasswordForgetForm';

const PasswordForget = () => (
  <div className={classes.PasswordForget}>
    <h1>Password reset</h1>
    <PasswordForgetForm />
  </div>
);

export default PasswordForget