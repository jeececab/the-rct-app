import React, { Component } from 'react';
import classes from './Calendar.module.css';
import { connect } from 'react-redux';
import DayCell from './DayCell/DayCell';

class Calendar extends Component {
  openDayHandler = event => {
    console.log(event.target.id);
  };

  formatTitle = day => {
    let exercise = null;
    if (day.primaryExercises) {
      exercise = day.primaryExercises[0];
    } else if (day.secondaryExercises) {
      exercise = day.secondaryExercises[0];
    }
    const title = exercise
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str) {
        return str.toUpperCase();
      });

    return title;
  };

  getTitleStyle = day => {
    let style = null;
    if (day.primaryExercises) {
      style = 'Primary';
    }
    return style;
  };

  render() {
    const { trainingDays } = this.props;

    const days = trainingDays.map(day => {
      return (
        <DayCell
          phase={day.phase}
          dayDate={day.date.split(' ')[2]}
          titleStyle={this.getTitleStyle(day)}
          key={day.id}
          id={day.id}
          clicked={this.openDayHandler}
        >
          {this.formatTitle(day)}
        </DayCell>
      );
    });

    return <ul className={classes.Calendar}>{days}</ul>;
  }
}

const mapStateToProps = state => {
  return {
    trainingDays: state.season.ongoingSeason.trainingDays
  };
};

export default connect(mapStateToProps)(Calendar);
