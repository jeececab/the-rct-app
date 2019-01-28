import React, { Component } from 'react';
import classes from './Season.module.css';
import { connect } from 'react-redux';
import NewSeason from '../../components/NewSeason/NewSeason';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import {
  fetchSeason,
  startNewSeason,
  abortNewSeason
} from '../../store/actions';

class Season extends Component {
  componentWillMount() {
    this.props.fetchSeason(this.props.userId);
  }

  startNewSeasonHandler = () => {
    this.props.startNewSeason();
  };

  abortNewSeasonHandler = () => {
    this.props.abortNewSeason();
  };

  render() {
    const { hasSeason } = this.props;

    let season = (
      <h3>
        No season yet?{' '}
        <Button btnType="Link" clicked={this.startNewSeasonHandler}>
          Start a new season
        </Button>
      </h3>
    );

    if (hasSeason) {
      season = <h2>Todo: My ongoing season</h2>;
    }

    return (
      <div className={classes.Season}>
        <h1>Season</h1>
        {season}
        <Modal
          show={this.props.startingNewSeason}
          modalClosed={this.abortNewSeasonHandler}
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
    hasSeason: state.season.ongoingSeason,
    startingNewSeason: state.newSeason.startingNewSeason
  };
};

export default connect(
  mapStateToProps,
  { fetchSeason, startNewSeason, abortNewSeason }
)(Season);
