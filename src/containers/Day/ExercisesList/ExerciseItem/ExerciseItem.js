import React, { Component } from 'react';
import classes from './ExerciseItem.module.css';
import { connect } from 'react-redux';

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

  formatTitle = exer => {
    const title = exer.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
      return str.toUpperCase();
    });
    return title;
  };

  render() {
    const { exercisesList, exerciseID, phase } = this.props;
    const { opened } = this.state;

    let exerItemUI = null;

    if (exercisesList) {
      exerItemUI = (
        <li className={[classes.ExerciseItem, classes[phase]].join(' ')}>
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
    exercisesList: state.exercises.exercises.exercisesList
  };
};

export default connect(mapStateToProps)(ExerciseItem);
