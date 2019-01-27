import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ROUTES from './constants/routes';
import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Account from './components/Account/Account';
import Season from './containers/Season/Season';

import { fetchUser } from './store/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const { auth } = this.props;

    let routes = (
      <React.Fragment>
        <Switch>
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          <Route exact path="/" component={Landing} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );

    if (auth) {
      routes = (
        <React.Fragment>
          <Switch>
            <Navigation />
          </Switch>

          <Switch>
            <Route path={ROUTES.ACCOUNT} component={Account} />
            <Route path={ROUTES.SEASON} component={Season} />
            <Redirect to={ROUTES.ACCOUNT} />
          </Switch>
        </React.Fragment>
      );
    }

    return <BrowserRouter>{routes}</BrowserRouter>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.data
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
