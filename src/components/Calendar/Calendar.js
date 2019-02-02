import React, { Component } from 'react';
import classes from './Calendar.module.css';
import Day from './Day/Day';

class Calendar extends Component {
  
  openDayHandler() {

  }

  render() {
    return(
      <ul className={classes.Calendar}>
        <Day key='1' clicked={this.openDayHandler}>Day 1</Day>
        <Day key='2' clicked={this.openDayHandler}>Day 2</Day>
        <Day key='3' clicked={this.openDayHandler}>Day 3</Day>
        <Day key='4' clicked={this.openDayHandler}>Day 4</Day>
        <Day key='5' clicked={this.openDayHandler}>Day 5</Day>
        <Day key='6' clicked={this.openDayHandler}>Day 6</Day>
        <Day key='7' clicked={this.openDayHandler}>Day 7</Day>
        <Day key='8' clicked={this.openDayHandler}>Day 8</Day>
        <Day key='9' clicked={this.openDayHandler}>Day 9</Day>
      </ul>
    );
  }
}

export default Calendar;