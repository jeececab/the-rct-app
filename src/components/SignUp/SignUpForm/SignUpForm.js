import React, { Component } from 'react';
import classes from './SignUpForm.module.css';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions';
import PropTypes from 'prop-types';
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

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push(ROUTES.ACCOUNT);
    }
  }

  handleSubmit = event => {
    const { signUp } = this.props;
    const { email, password } = this.state;
    signUp(email, password);
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
      <form onSubmit={this.handleSubmit} className={classes.SignUpForm}>
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

function mapStateToProps(state) {
  return { auth: state.auth.data };
}

export default connect(
  mapStateToProps,
  { signUp }
)(SignUpForm);
