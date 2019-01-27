import React, { Component } from 'react';
import classes from './Season.module.css';
import { connect } from 'react-redux';
import NewSeason from '../../components/NewSeason/NewSeason';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import { fetchSeason } from '../../store/actions';

class Season extends Component {
  state = {
    startingNewSeason: false
  };

  componentWillMount() {
    this.props.fetchSeason(this.props.userId);
  }

  newSeasonClosedHandler = () => {
    this.setState({ startingNewSeason: false });
  };

  newSeasonOpenHandler = () => {
    this.setState({ startingNewSeason: true });
  };

  render() {
    const { hasSeason } = this.props;

    let season = (
      <h3>
        No season yet?{' '}
        <Button btnType="Link" clicked={this.newSeasonOpenHandler}>
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
          show={this.state.startingNewSeason}
          modalClosed={this.newSeasonClosedHandler}
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
    hasSeason: state.season.ongoingSeason
  };
};

export default connect(
  mapStateToProps,
  { fetchSeason }
)(Season);

/* import React, { Component } from 'react';
import classes from './Season.module.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../store/actions';
import Day from '../../components/Day/Day';

class Season extends Component {
  componentWillMount() {
    this.props.fetchDays();
  }

  handleAddDay = event => {
    const { addDay } = this.props;
    event.preventDefault();
    addDay({ title: 'Day' });
  };

  render() {
    const { season } = this.props;
    
    const days = _.map(season, (day, key) => {
      return <Day key={key} dayId={key} title={day.title}/>
    })

    return (
      <div className={classes.Season}>
        <h1>Season</h1>
        <button onClick={this.handleAddDay}>Add Day</button>
        { days }
      </div>
    );
  }
}


const mapStateToProps = ({ season }) => {
  return {
    season
  };
};

export default connect(mapStateToProps, actions)(Season); */
