import React, { Component } from 'react';
import classes from './Calendar.module.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import DayCell from './DayCell/DayCell';
import Button from '../UI/Button/Button';

class Calendar extends Component {
  formatTitle = day => {
    let exer = _.find(day.exercises, exer => {
      return exer.type === 'primary';
    });

    if (exer === undefined) {
      exer = _.find(day.exercises, exer => {
        return exer.type === 'secondary';
      });
    }

    if (exer === undefined) {
      return null;
    }

    const formatedTitle = exer.title
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str) {
        return str.toUpperCase();
      });

    return formatedTitle;
  };

  getTitleStyle = day => {
    let style = null;

    let exer = _.find(day.exercises, exer => {
      return exer.type === 'primary';
    });

    if (exer) {
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
          dayDate={day.date}
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
