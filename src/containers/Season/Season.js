import React, { Component } from 'react';
import classes from './Season.module.css';
import { withAuthorization } from '../../components/Session';

class Season extends Component {
  render() {
    return (
      <div className={classes.Season}>
        <h1>Season</h1>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Season);
