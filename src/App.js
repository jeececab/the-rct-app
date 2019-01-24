import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import * as ROUTES from './constants/routes';
import { withFirebase } from './components/Firebase';
import { compose } from 'recompose';

import { AuthUserContext } from './components/Session';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Account from './containers/Account/Account';
import Season from './containers/Season/Season';

class AppBase extends Component {
  state = {
    authUser: null
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const routesNonAuth = (
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Redirect to={ROUTES.LANDING} />
      </Switch>
    );

    const routesAuth = (
      <Layout>
        <Switch>
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.SEASON} component={Season} />
          <Redirect to={ROUTES.ACCOUNT} />
        </Switch>
      </Layout>
    );

    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <div>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? routesAuth : routesNonAuth
            }
          </AuthUserContext.Consumer>
        </div>
      </AuthUserContext.Provider>
    );
  }
}

const App = compose(
  withRouter,
  withFirebase
)(AppBase);

export default App;
