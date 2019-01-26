import React, { Component } from 'react';
import classes from './SignUpForm.module.css';
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../Firebase/index';
import { compose } from 'recompose'
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';

const INITIAL_STATE = {
  username: '',
  email: '',
  emailTwo: '',
  password: '',
  passwordTwo: '',
  error: null
};

class SignUpFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      emailTwo,
      password,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      password !== passwordTwo ||
      password === '' ||
      email !== emailTwo ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} className={classes.SignUpForm}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="emailTwo"
          value={emailTwo}
          onChange={this.onChange}
          type="text"
          placeholder="Confirm Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <Button btnType="Primary" type="submit" disabled={isInvalid}>
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
