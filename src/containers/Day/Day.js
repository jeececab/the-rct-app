import React, { Component } from 'react';
import classes from './Day.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import ExercisesList from './ExercisesList/ExercisesList';

class Day extends Component {
  render() {
    const { isLoading, ongoingSeason } = this.props;

    let dayUI = null;

    if (ongoingSeason) {
      const dayNb = this.props.location.pathname.split('-')[2] - 1;
      const day = ongoingSeason.trainingDays[dayNb];
      if (day) {
        dayUI = (
          <React.Fragment>
            <h2>{day.date.slice(0, -5)}</h2>
            <ExercisesList day={day} />
          </React.Fragment>
        );
      } else {
        dayUI = <p className={classes.DayInvalid}>This day ID is not valid.</p>;
      }
    }

    if (isLoading) {
      dayUI = <Spinner />;
    }

    return <div className={classes.Day}>{dayUI}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ongoingSeason: state.season.ongoingSeason,
    isLoading: state.request.loading
  };
};

export default withRouter(connect(mapStateToProps)(Day));
