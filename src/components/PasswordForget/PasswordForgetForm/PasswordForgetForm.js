import React, { Component } from 'react';
import classes from './PasswordForgetForm.module.css';
import { connect } from 'react-redux';
import { resetPassword, clearError } from '../../../store/actions';
import PropTypes from 'prop-types';
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

const INITIAL_STATE = {
  email: ''
};

class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE };

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.pwResetSent) {
      this.context.router.history.push(ROUTES.SIGN_IN);
    }
  }

  componentWillUnmount() {
    clearError();
  }

  handleSubmit = event => {
    const { resetPassword } = this.props;
    const { email } = this.state;
    resetPassword(email);
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error, isLoading } = this.props;
    const { email } = this.state;

    const isInvalid = email === '';

    let form = (
      <form className={classes.PasswordForgetForm} onSubmit={this.handleSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button btnType="Primary" disabled={isInvalid} type="submit">
          Send
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
    authUser: state.request.authUser,
    error: state.request.error,
    isLoading: state.request.loading,
    pwResetSent: state.request.pwResetSent
  };
}

export default connect(
  mapStateToProps,
  { resetPassword, clearError }
)(PasswordForgetForm);
