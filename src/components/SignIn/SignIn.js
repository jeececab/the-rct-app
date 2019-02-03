import React, { Component } from 'react';
import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as ROUTES from '../../constants/routes';
import SignInForm from './SignInForm/SignInForm';

class SignIn extends Component {
  componentDidMount() {
    if (this.props.authUser === null) {
       this.props.history.push(ROUTES.SIGN_IN);
    }
  }
  
  render() {
    return (
      <div className={classes.SignIn}>
        <h1>Sign In</h1>
        <SignInForm />
        <p>
          Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
        <p>
          <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.authUser,
  };
};

export default connect(mapStateToProps)(SignIn);
