import React, { Component } from 'react';
import classes from './NewSeason.module.css';
import Button from '../../components/UI/Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class NewSeason extends Component {
  state = {
    step: 'trainingPlan',
    trainingPlan: null,
    startDate: null
  };

  trainingPlanHandler = event => {
    const trainingPlan = event.target.innerHTML.toLowerCase();
    this.setState({
      trainingPlan: trainingPlan,
      step: 'startDate'
    });
  };

  dateChangeHandler = date => {
    this.setState({
      startDate: date
    });
  };

  dateConfirmHandler = () => {};

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

    const isInvalid = this.state.startDate === null;

    if (this.state.step === 'startDate') {
      step = (
        <React.Fragment>
          <h3>Step 2 - Choose a starting date</h3>
          <div className={classes.DatePicker}>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.dateChangeHandler}
            />
          </div>
          <Button
            btnType="Link"
            clicked={this.dateConfirmHandler}
            disabled={isInvalid}
          >
            Continue
          </Button>
        </React.Fragment>
      );
    }

    return <div className={classes.NewSeason}>{step}</div>;
  }
}

export default NewSeason;
