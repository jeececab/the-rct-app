import React, { Component } from 'react';
import classes from './NewSeason.module.css';
import { connect } from 'react-redux';
import {
  setTrainingPlan,
  setStartDate,
  setSeasonTitle,
  newSeasonStepBack,
  confirmNewSeason
} from '../../store/actions';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class NewSeason extends Component {
  state = {
    changedDate: null,
    changedTitle: null
  };

  componentDidMount() {
    this.setState({
      changedDate: null,
      changedTitle: null
    });
  }

  newSeasonStepBackHandler = step => {
    this.props.newSeasonStepBack(step);
    this.setState({ changedDate: null, changedTitle: null });
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

  changeTitleHandler = event => {
    this.setState({
      changedTitle: event.target.value
    });
  };

  submitTitleHandler = event => {
    event.preventDefault();
    this.props.setSeasonTitle(this.state.changedTitle);
  };

  confirmNewSeasonHandler = () => {
    const { trainingPlan, startDate, userId, title } = this.props;
    this.props.confirmNewSeason(trainingPlan, startDate, userId, title);
  };

  render() {
    const { isLoading, step, startDate, trainingPlan, title } = this.props;

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
        <p className={classes.Note}>
          <b>Note:</b> you will be able to customize your chosen training plan
          as well.
        </p>
      </React.Fragment>
    );

    if (isLoading) {
      UIstep = <Spinner />;
    }

    if (step === 'step2') {
      const isInvalid = this.state.changedDate === null;
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
      const isInvalid = this.state.changedTitle === null;
      UIstep = (
        <React.Fragment>
          <h3>Step 3 - Choose a season title</h3>
          <form onSubmit={this.submitTitleHandler}>
            <input
              className={classes.Title}
              onChange={this.changeTitleHandler}
            />

            <p className={classes.Note}>
              (Exemple: Winter-Spring 2019, Indian Creek Preparation, etc.)
            </p>

            <div className={classes.Btns}>
              <Button
                btnType="Link-danger"
                clicked={() => this.newSeasonStepBackHandler('step2')}
                type="button"
              >
                Back
              </Button>
              <Button btnType="Link" type="submit" disabled={isInvalid}>
                Continue
              </Button>
            </div>
          </form>
        </React.Fragment>
      );
    }

    if (step === 'step4') {
      const date = new Date(startDate);

      UIstep = (
        <React.Fragment>
          <h3>Step 4 - Confirmation</h3>
          <p>
            {trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1)}{' '}
            training plan
          </p>
          <p>Starting on {date.toDateString()}</p>
          <p>
            Titled <b>{title}</b>
          </p>
          <div className={classes.Btns}>
            <Button
              btnType="Link-danger"
              clicked={() => this.newSeasonStepBackHandler('step3')}
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
    title: state.newSeason.title,
    userId: state.auth.authUser.uid,
    isLoading: state.request.loading
  };
};

export default connect(
  mapStateToProps,
  {
    setTrainingPlan,
    setStartDate,
    setSeasonTitle,
    newSeasonStepBack,
    confirmNewSeason
  }
)(NewSeason);
