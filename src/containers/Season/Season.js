import React, { Component } from 'react';
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
    const { data } = this.props;
    
    const days = _.map(data, (day, key) => {
      console.log(day, key)
      return <Day key={key} dayId={key} day={day}/>
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


const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Season);
