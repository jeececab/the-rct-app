import React, { Component } from 'react';
import classes from './NewSeason.module.css';
import { connect } from 'react-redux';
import {
  setTrainingPlan,
  setStartDate,
  newSeasonStepBack,
  confirmNewSeason
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

  newSeasonStepBackHandler = step => {
    this.props.newSeasonStepBack(step);
    this.setState({ changedDate: null });
  };

  choosePlanHandler = event => {
    const trainingPlan = event.target.innerHTML.toLowerCase().replace(/ /g, '');
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
    this.props.confirmNewSeason(
      this.props.trainingPlan,
      this.props.startDate,
      this.props.userId
    );
  };

  render() {
    const { step, startDate, trainingPlan } = this.props;

    let UIstep = (
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
          Custom plan
        </Button>
        <p>
          <b>Note:</b> you will be able to customize your chosen training plan
          as well.
        </p>
      </React.Fragment>
    );

    const isInvalid = this.state.changedDate === null;

    if (step === 'step2') {
      UIstep = (
        <React.Fragment>
          <h3>Step 2 - Choose a starting date</h3>
          <div className={classes.DatePicker}>
            <DatePicker
              selected={this.state.changedDate}
              onChange={this.changeDateHandler}
            />
          </div>
          <div className={classes.Btns}>
            <Button
              btnType="Link-danger"
              clicked={() => this.newSeasonStepBackHandler('step1')}
            >
              Back
            </Button>
            <Button
              btnType="Link"
              clicked={this.confirmDateHandler}
              disabled={isInvalid}
            >
              Continue
            </Button>
          </div>
        </React.Fragment>
      );
    }

    if (step === 'step3') {
      const date = new Date(startDate);

      UIstep = (
        <React.Fragment>
          <h3>Step 3 - Confirmation</h3>
          <h4>
            {trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1)}{' '}
            training plan
          </h4>
          <h4>Starting on {date.toDateString()}</h4>
          <div className={classes.Btns}>
            <Button
              btnType="Link-danger"
              clicked={() => this.newSeasonStepBackHandler('step2')}
            >
              Back
            </Button>
            <Button btnType="Link" clicked={this.confirmNewSeasonHandler}>
              Confirm
            </Button>
          </div>
        </React.Fragment>
      );
    }

    return <div className={classes.NewSeason}>{UIstep}</div>;
  }
}

const mapStateToProps = state => {
  return {
    step: state.newSeason.newSeasonStep,
    startDate: state.newSeason.startDate,
    trainingPlan: state.newSeason.trainingPlan,
    userId: state.auth.authUser.uid
  };
};

export default connect(
  mapStateToProps,
  {
    setTrainingPlan,
    setStartDate,
    newSeasonStepBack,
    confirmNewSeason
  }
)(NewSeason);
