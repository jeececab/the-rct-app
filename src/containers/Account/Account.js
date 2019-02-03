import React, { Component } from 'react';
import classes from './Account.module.css';

class Account extends Component {
  componentDidMount() {
    this.props.history.push('/account');
  }

  render() {
    return (
      <div className={classes.Account}>
        <h1>My Account</h1>
        <h3>Change email</h3>
        <h3>Change password</h3>
        <h3>Change username</h3>
        <h3>Check past seasons</h3>
      </div>
    );
  }
}

export default Account;
