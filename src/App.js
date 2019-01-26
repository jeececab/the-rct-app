import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ROUTES from './constants/routes';
import requireAuth from './components/Auth/requireAuth';
import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Account from './components/Account/Account';
import Season from './containers/Season/Season';

import { fetchUser } from './store/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Navigation />
          </Switch>
          <Route exact path="/" component={requireAuth(Landing, 'nonAuth')} />
          <Route
            exact
            path={ROUTES.SIGN_IN}
            component={requireAuth(SignIn, 'nonAuth')}
          />
          <Route
            exact
            path={ROUTES.SIGN_UP}
            component={requireAuth(SignUp, 'nonAuth')}
          />
          <Route exact path={ROUTES.ACCOUNT} component={requireAuth(Account)} />
          <Route exact path={ROUTES.SEASON} component={requireAuth(Season)} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
