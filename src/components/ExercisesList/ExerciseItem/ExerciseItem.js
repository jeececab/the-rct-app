import React, { Component } from 'react';
import classes from './ExerciseItem.module.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../UI/Button/Button';
import RouteAdder from '../../RouteAdder/RouterAdder';

class ExerciseItem extends Component {
  state = {
    opened: false
  };

  toolComponents = {
    RouteAdder: RouteAdder
  };

  toggleContentHandler = () => {
    const $state = { ...this.state };
    this.setState({
      opened: !$state.opened
    });
  };

  deleteExerciseHandler = () => {
    console.log(this.props.id);
  };

  formatTitle = exer => {
    const title = exer.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
      return str.toUpperCase();
    });
    return title;
  };

  render() {
    const { id, exercises, exerciseTitle, phase } = this.props;
    const { opened } = this.state;

    let exerItemUI = null;
    let tools = null;

    if (exercises !== null) {
      const exercise = exercises.exercisesList[exerciseTitle];

      if (exercise.tools) {

        //temporary object for tests
        const data = {
          routeName: 'Grenouillage',
          routeGrade: '5.12a',
          routeStatus: 'Redpoint',
          routeNotes: 'Cool route'
        };

        tools = _.map(exercise.tools, (tool, index) => {
          const Tool = this.toolComponents[tool];
          return (
            <Tool key={'tool-' + index} id={'tool-' + index} data={data} />
          );
        });
      }

      exerItemUI = (
        <li
          id={this.props.id}
          className={[classes.ExerciseItem, classes[phase]].join(' ')}
        >
          <h3 onClick={this.toggleContentHandler}>
            {this.formatTitle(exerciseTitle)}
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
            {tools}
            <p>{exercise.directives}</p>
            <Button btnType="Secondary-small" type="submit">
              Save
            </Button>
            <Button btnType="Delete" clicked={this.deleteExerciseHandler}>
              Delete
            </Button>
          </div>
        </li>
      );
    }

    return <React.Fragment>{exerItemUI}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises.exercises,
    trainingDays: state.season.ongoingSeason.trainingDays
  };
};

export default connect(mapStateToProps)(ExerciseItem);
