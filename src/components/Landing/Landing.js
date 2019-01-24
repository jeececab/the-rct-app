import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Landing.module.css';
import * as ROUTES from '../../constants/routes';
import LandingImage from '../../assets/images/welcome-img.jpg';

const landing = props => {
  return (
    <React.Fragment>
      <div className={classes.Landing}>
        <div className={classes.LandingImg}>
          <img
            src={LandingImage}
            alt="Sonnie Trotter climbing the Totem Pole"
          />
        </div>

        <div className={classes.LandingContent}>
          <h1>The Rock Climber's Training App</h1>
          <h2>A tool for continuous improvement</h2>

          <p>
            The Rock Climber's Training App is an interactive calender designed
            to help you build, follow and log your training plan based on
            Michael L. Anderson and Mark L. Anderson's book:&nbsp;
            <a
              href="https://rockclimberstrainingmanual.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Rock Climber's Training Manuel
            </a>
            .
          </p>

          <p>
            You can start by choosing one of the four templates they suggest
            (novice, advanced, trad or bouldering) and then customize it to your
            own needs. It's strongly recommended to buy the book, as this app is
            not meant to explain all the knowledge that is available in the
            book.
          </p>

          <div className={classes.LandingBtns}>
            <Link to={ROUTES.SIGN_UP} className={classes.LandingBtnsPrimary}>Get started</Link>
            <Link to={ROUTES.SIGN_IN} className={classes.LandingBtnsSecondary}>Sign in</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default landing;
