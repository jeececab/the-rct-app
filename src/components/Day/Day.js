import React, { Component } from 'react';
import classes from './Day.module.css';
import { connect } from 'react-redux';
import { deleteDay } from '../../store/actions';

class Day extends Component {
  handleDeleteDay = dayId => {
    const { deleteDay } = this.props;
    deleteDay(dayId);
  };

  render() {
    const { dayId, day, key } = this.props;
    return (
      <div key={key} className={classes.Day}>
        <h2>{day.title}</h2>
        <button onClick={() => this.handleDeleteDay(dayId)}>Delete Day</button>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteDay }
)(Day);
