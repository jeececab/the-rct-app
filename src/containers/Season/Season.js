import React, { Component } from 'react';
import classes from './Season.module.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../store/actions';
import Day from '../../components/Day/Day';

class Season extends Component {
  componentWillMount() {
    console.log(actions)
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

export default connect(mapStateToProps, actions)(Season);
