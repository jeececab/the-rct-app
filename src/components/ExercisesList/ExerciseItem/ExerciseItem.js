import React, { Component } from 'react';
import classes from './ExerciseItem.module.css';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';

class ExerciseItem extends Component {
  state = {
    opened: false
  };

  toggleContentHandler = () => {
    const $state = { ...this.state };
    this.setState({
      opened: !$state.opened
    });
  };

  deleteExerciseHandler = () => {
    console.log(this.props.id)
  }

  formatTitle = exer => {
    const title = exer.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
      return str.toUpperCase();
    });
    return title;
  };

  render() {
    const { exercises, exerciseID, phase } = this.props;
    const { opened } = this.state;

    let exerItemUI = null;

    if (exercises !== null) {
      const exercise = exercises.exercisesList[exerciseID]

      exerItemUI = (
        <li id={this.props.id} className={[classes.ExerciseItem, classes[phase]].join(' ')}>
          <h3 onClick={this.toggleContentHandler}>
            {this.formatTitle(exerciseID)}
          </h3>
          <div
            className={[
              classes.Arrow,
              classes[opened ? 'Arrow--down' : null]
            ].join(' ')}
          />
          <div
            className={[
              classes.Content,
              classes[opened ? 'Display' : null]
            ].join(' ')}
          >
            <p>{exercise.directives}</p>
            <Button btnType="Delete" clicked={this.deleteExerciseHandler}>Delete</Button>
          </div>
        </li>
      );
    }

    return <React.Fragment>{exerItemUI}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises.exercises
  };
};

export default connect(mapStateToProps)(ExerciseItem);
