import React from 'react';
import Button from '../UI/Button/Button'

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button btnType="Secondary-small" type="button" clicked={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);