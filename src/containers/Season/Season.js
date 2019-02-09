import React, { Component } from 'react';
import classes from './Season.module.css';
import { connect } from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';
import NewSeason from '../../components/NewSeason/NewSeason';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {
  clearError,
  startNewSeason,
  newSeasonStepBack
} from '../../store/actions';

class Season extends Component {
  componentWillUnmount() {
    this.props.clearError(this.props.error);
  }

  startNewSeasonHandler = () => {
    this.props.startNewSeason();
  };

  newSeasonStepBackHandler = () => {
    this.props.newSeasonStepBack(null);
  };

  render() {
    const { ongoingSeason, error, isLoading } = this.props;

    let season = false;

    if (isLoading) {
      season = <Spinner />;
    }

    if (error) {
      season = error && <p>{error}</p>;
    }

    if (ongoingSeason) {
      season = <Calendar />;
    } else if (ongoingSeason === null) {
      season = (
        <h3>
          No season yet?{' '}
          <Button btnType="Link" clicked={this.startNewSeasonHandler}>
            Start a new season
          </Button>
        </h3>
      );
    }

    return (
      <div className={classes.Season}>
        <h1>Season</h1>
        {season}
        <Modal
          show={this.props.startingNewSeason}
          modalClosed={this.newSeasonStepBackHandler}
        >
          <NewSeason />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.authUser.uid,
    ongoingSeason: state.season.ongoingSeason,
    startingNewSeason: state.newSeason.startingNewSeason,
    error: state.request.error,
    isLoading: state.request.loading
  };
};

export default connect(
  mapStateToProps,
  { clearError, startNewSeason, newSeasonStepBack }
)(Season);
