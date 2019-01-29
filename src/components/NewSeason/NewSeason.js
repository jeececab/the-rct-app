import React, { Component } from 'react';
import classes from './NewSeason.module.css';
import { connect } from 'react-redux';
import {
  setTrainingPlan,
  setStartDate,
  fetchTrainingPlan
} from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class NewSeason extends Component {
  state = {
    changedDate: null
  };

  componentWillMount() {
    this.setState({
      changedDate: null
    });
  }

  choosePlanHandler = event => {
    const trainingPlan = event.target.innerHTML.toLowerCase();
    this.props.setTrainingPlan(trainingPlan);
  };

  changeDateHandler = date => {
    this.setState({
      changedDate: date
    });
  };

  confirmDateHandler = () => {
    this.props.setStartDate(this.state.changedDate);
  };

  confirmNewSeasonHandler = () => {
    this.props.fetchTrainingPlan(this.props.trainingPlan);
  };

  render() {
    let step = (
      <React.Fragment>
        <h3>Step 1 - Choose a training plan</h3>
        <Button btnType="Link" clicked={this.choosePlanHandler}>
          Novice
        </Button>
        <Button btnType="Link" clicked={this.choosePlanHandler}>
          Experienced
        </Button>
        <Button btnType="Link" clicked={this.choosePlanHandler}>
          Trad
        </Button>
        <Button btnType="Link" clicked={this.choosePlanHandler}>
          Bouldering
        </Button>
        <h3>Or create your own</h3>
        <Button btnType="Link" clicked={this.choosePlanHandler}>
          Blank template
        </Button>
        <p>
          <b>Note:</b> you will be able to customize your chosen training plan
          as well.
        </p>
      </React.Fragment>
    );

    const isInvalid = this.state.changedDate === null;

    if (this.props.step === 'step2') {
      step = (
        <React.Fragment>
          <h3>Step 2 - Choose a starting date</h3>
          <div className={classes.DatePicker}>
            <DatePicker
              selected={this.state.changedDate}
              onChange={this.changeDateHandler}
            />
          </div>
          <Button
            btnType="Link"
            clicked={this.confirmDateHandler}
            disabled={isInvalid}
          >
            Continue
          </Button>
        </React.Fragment>
      );
    }

    if (this.props.step === 'step3') {
      step = (
        <React.Fragment>
          <h3>Step 3 - Confirmation</h3>
          <Button btnType="Link" clicked={this.confirmNewSeasonHandler}>
            Confirm
          </Button>
        </React.Fragment>
      );
    }

    return <div className={classes.NewSeason}>{step}</div>;
  }
}

const mapStateToProps = state => {
  return {
    step: state.newSeason.newSeasonStep,
    startDate: state.newSeason.startDate,
    startingNewSeason: state.newSeason.startingNewSeason,
    trainingPlan: state.newSeason.trainingPlan
  };
};

export default connect(
  mapStateToProps,
  { setTrainingPlan, setStartDate, fetchTrainingPlan }
)(NewSeason);
