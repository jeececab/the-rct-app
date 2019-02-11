import React, { Component } from 'react';
import classes from './Account.module.css';

class Account extends Component {
  componentDidMount() {
    this.props.history.push('/account');
  }

  render() {
    return (
      <div className={classes.Account}>
        <h2>My Account</h2>
        <p>Change email</p>
        <p>Change password</p>
        <p>Change username</p>
        <p>Check past seasons</p>
      </div>
    );
  }
}

export default Account;
