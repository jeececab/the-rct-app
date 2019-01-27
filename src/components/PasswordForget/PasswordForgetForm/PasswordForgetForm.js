import React, { Component } from 'react';
import classes from './PasswordForgetForm.module.css';
import { connect } from 'react-redux';
import { passwordForget } from '../../../store/actions';
import PropTypes from 'prop-types';
import * as ROUTES from '../../../constants/routes';
import Button from '../../UI/Button/Button';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE };

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push(ROUTES.SIGN_IN);
    }
  }

  handleSubmit = event => {
    const { passwordForget } = this.props
    const { email } = this.state;
    passwordForget(email)
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
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

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.data };
}

export default connect(mapStateToProps, { passwordForget })(PasswordForgetForm);