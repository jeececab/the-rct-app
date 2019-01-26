import React, { Component } from 'react';
import classes from './SignInForm.module.css';
import { connect } from 'react-redux';
import { signIn } from '../../../store/actions';
import PropTypes from 'prop-types';
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends Component {
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
    const { signIn } = this.props;
    const { email, password } = this.state;
    signIn(email, password)
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
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

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(SignInForm);
