import React, { Component } from 'react';
import classes from './ExerciseItem.module.css';
import { connect } from 'react-redux';

class ExerciseItem extends Component {
  state = {
    opened: false
  };

  toggleExerciseHandler = () => {};

  formatTitle = exer => {
    const title = exer.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
      return str.toUpperCase();
    });
    return title;
  };

  render() {
    const { exercisesList, exerciseID, type, phase } = this.props;

    let exerItemUI = null;

    if (exercisesList) {
      exerItemUI = (
        <li
          className={[classes.ExerciseItem, classes[type], classes[phase]].join(
            ' '
          )}
          onClick={this.toggleExerciseHandler}
        >
          <h3>{this.formatTitle(exerciseID)}</h3>
          <div
            className={[classes.Content, classes[this.state.opened]].join(' ')}
          >
            <p>{exercisesList[exerciseID].directives}</p>
          </div>
        </li>
      );
    }

    return <React.Fragment>{exerItemUI}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    exercisesList: state.exercises.exercisesList
  };
};

export default connect(mapStateToProps)(ExerciseItem);
