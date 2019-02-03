import React, { Component } from 'react';
import classes from './Day.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

class Day extends Component {
  render() {
    const { isLoading, ongoingSeason } = this.props;

    let dayUI;

    if (ongoingSeason) {
      const dayNb = this.props.location.pathname.split('-')[2] - 1;
      const day = ongoingSeason.trainingDays[dayNb];
      dayUI = <h2>{day.date}</h2>;
    }

    if (isLoading) {
      dayUI = <Spinner />;
    }

    return <React.Fragment>{dayUI}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    ongoingSeason: state.season.ongoingSeason,
    isLoading: state.request.loading
  };
};

export default withRouter(connect(mapStateToProps)(Day));
