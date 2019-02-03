import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ROUTES from './constants/routes';
import Spinner from './components/UI/Spinner/Spinner';
import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Account from './containers/Account/Account';
import Season from './containers/Season/Season';
import Day from './containers/Day/Day';
import { fetchUser } from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { authUser, isLoading } = this.props;

    let routes;

    if (isLoading) {
      routes = <Spinner />;
    } else {
      routes = (
        <React.Fragment>
          <Switch>
            <Navigation />
          </Switch>

          <Route
            path={ROUTES.ACCOUNT}
            component={authUser ? Account : SignIn}
          />
          <Route path={ROUTES.SEASON} component={authUser ? Season : SignIn} />
          <Route
            path={ROUTES.TRAINING_DAYS + '/:id'}
            component={authUser ? Day : SignIn}
          />

          <Route
            path={ROUTES.SIGN_IN}
            component={!authUser ? SignIn : Account}
          />
          <Route
            path={ROUTES.SIGN_UP}
            component={!authUser ? SignUp : Account}
          />
          <Route
            path={ROUTES.PASSWORD_FORGET}
            component={!authUser ? PasswordForget : Account}
          />
          <Route exact path="/" component={!authUser ? Landing : Account} />
        </React.Fragment>
      );
    }

    return <BrowserRouter>{routes}</BrowserRouter>;
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.authUser,
    isLoading: state.request.loading
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
