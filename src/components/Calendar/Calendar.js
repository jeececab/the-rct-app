import React, { Component } from 'react';
import classes from './Calendar.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import DayCell from './DayCell/DayCell';
import Button from '../UI/Button/Button';

class Calendar extends Component {
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

  openDayHandler = event => {
    this.props.history.push(ROUTES.TRAINING_DAYS + '/' + event.target.id);
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

    return (
      <React.Fragment>
        <ul className={classes.Calendar}>
          {days}
          <Button btnType="Cell">Add day</Button>
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingDays: state.season.ongoingSeason.trainingDays
  };
};

export default withRouter(connect(mapStateToProps)(Calendar));
