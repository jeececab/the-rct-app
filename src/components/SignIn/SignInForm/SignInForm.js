import React, { Component } from 'react';
import classes from './SignInForm.module.css';
import * as ROUTES from '../../../constants/routes';
import { withFirebase } from '../../Firebase/index';
import Button from '../../UI/Button/Button';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className={classes.SignInForm}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <Button btnType="Primary" type="submit" disabled={isInvalid}>
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
/* 
const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase); */

export default withFirebase(SignInForm);
