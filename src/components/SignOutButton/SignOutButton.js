import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import { signOut } from '../../store/actions';
import { connect } from 'react-redux';

class SignOutButton extends Component {
  render() {
    const { signOut } = this.props;
    return (
      <Button btnType="Secondary-small" type="button" clicked={signOut}>
        Sign Out
      </Button>
    );
  }
}

export default connect(
  null,
  { signOut }
)(SignOutButton);
