import React, { Component } from 'react';
import classes from './SignUpForm.module.css';
import { withFirebase } from '../../Firebase/index';
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';

const INITIAL_STATE = {
  username: '',
  emailOne: '',
  emailTwo: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { username, emailOne, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(emailOne, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          emailOne
        });
      })
      .then(authUser => {
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
      emailOne,
      emailTwo,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      emailOne !== emailTwo ||
      emailOne === '' ||
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
          name="emailOne"
          value={emailOne}
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
          name="passwordOne"
          value={passwordOne}
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

export default withFirebase(SignUpForm);
