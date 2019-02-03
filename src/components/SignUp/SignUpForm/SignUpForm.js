import React, { Component } from 'react';
import classes from './SignUpForm.module.css';
import { connect } from 'react-redux';
import { signUp, clearError } from '../../../store/actions';
import PropTypes from 'prop-types';
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

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
    if (nextProps.authUser) {
      this.context.router.history.push(ROUTES.ACCOUNT);
    }
  }

  componentWillUnmount() {
    this.props.clearError(this.props.error);
  }

  handleSubmit = event => {
    const { signUp } = this.props;
    const { email, password, username } = this.state;
    signUp(email, password, username);
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, emailTwo, password, passwordTwo } = this.state;
    const { error, isLoading } = this.props;

    const isInvalid =
      password !== passwordTwo ||
      password === '' ||
      email !== emailTwo ||
      email === '' ||
      username === '';

    let form = (
      <form onSubmit={this.handleSubmit} className={classes.SignUpForm}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="User Name"
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
      </form>
    );

    if (isLoading) {
      form = <Spinner />;
    }

    return (
      <React.Fragment>
        {form}
        {error && <p>{error.message}</p>}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.auth.authUser,
    error: state.request.error,
    isLoading: state.request.loading
  };
}

export default connect(
  mapStateToProps,
  { signUp, clearError }
)(SignUpForm);
