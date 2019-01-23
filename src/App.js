import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import Layout from './hoc/Layout/Layout';
import * as ROUTES from './constants/routes';

import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Account from './containers/Account/Account';

class App extends Component {
  state = {
    isAuthenticated: false
  };

  render() {
    let routes = (
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />
      </Switch>
    );

  /*   if (this.state.isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route exact path="/account" component={Account} />
          </Switch>
        </Layout>
      );
    } */

    return <div>{routes}</div>;
  }
}

export default withRouter(App);
