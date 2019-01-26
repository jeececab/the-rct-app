import React from 'react';
import classes from './Account.module.css';
import { AuthUserContext, withAuthorization } from '../../components/Session';

const Account = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className={classes.Account}>
          <h1>{authUser.email}</h1>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
