import React, { Component } from 'react';
import classes from './NewSeason.module.css';
import Button from '../../components/UI/Button/Button';

class NewSeason extends Component {
  state = {
    step: 'trainingPlan',
    trainingPlan: null,
    startingDate: null
  };

  trainingPlanHandler = event => {
    const trainingPlan = event.target.innerHTML.toLowerCase();
    this.setState({
      trainingPlan: trainingPlan,
      step: 'startingDate'
    });
  };

  render() {
    let step = (
      <React.Fragment>
        <h3>Step 1 - Choose a training plan</h3>
        <Button btnType="Link" clicked={this.trainingPlanHandler}>
          Novice
        </Button>
        <Button btnType="Link" clicked={this.trainingPlanHandler}>
          Experienced
        </Button>
        <Button btnType="Link" clicked={this.trainingPlanHandler}>
          Trad
        </Button>
        <Button btnType="Link" clicked={this.trainingPlanHandler}>
          Bouldering
        </Button>
        <h3>Or create your own</h3>
        <Button btnType="Link" clicked={this.trainingPlanHandler}>
          Blank template
        </Button>
        <p>
          <b>Note:</b> you will be able to customize your chosen training plan
          as well.
        </p>
      </React.Fragment>
    );

    if (this.state.step === 'startingDate') {
      step = (
        <React.Fragment>
          <h3>Step 2 - Choose a starting date</h3>
        </React.Fragment>
      );
    }

    return <div className={classes.NewSeason}>{step}</div>;
  }
}

export default NewSeason;
