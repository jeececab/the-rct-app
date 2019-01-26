import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Account from './containers/Account/Account';
import Season from './containers/Season/Season';
import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';
import Layout from './hoc/Layout/Layout';

const App = () => (
  <Router>
    <div>
      <Layout />

      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path={ROUTES.ACCOUNT} component={Account} />
      <Route exact path={ROUTES.SEASON} component={Season} />
    </div>
  </Router>
);

export default withAuthentication(App);
