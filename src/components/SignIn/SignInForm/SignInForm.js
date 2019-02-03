import React, { Component } from 'react';
import classes from './SignInForm.module.css';
import { connect } from 'react-redux';
import { signIn, clearError } from '../../../store/actions';
import PropTypes from 'prop-types';
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

const INITIAL_STATE = {
  email: '',
  password: ''
};

class SignInForm extends Component {
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
    const { signIn } = this.props;
    const { email, password } = this.state;
    signIn(email, password);
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;
    const { error, isLoading } = this.props;

    const isInvalid = password === '' || email === '';

    let form = (
      <form onSubmit={this.handleSubmit} className={classes.SignInForm}>
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
  { signIn, clearError }
)(SignInForm);
