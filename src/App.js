/* import React from 'react';
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

export default withAuthentication(App); */
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ROUTES from './constants/routes';

import requireAuth from './components/Auth/requireAuth';
import Navigation from './components/Navigation/Navigation';
import Landing from './components/Landing/Landing';
import SignIn from './components/SignIn/SignIn';
import Account from './components/Account/Account';
import Season from './containers/Season/Season'

import { fetchUser } from './store/actions'

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const { auth } = this.props;
    
    console.log(auth)

    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />

          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          <Route exact path={ROUTES.ACCOUNT} component={requireAuth(Account)} />
          <Route exact path={ROUTES.SEASON} component={requireAuth(Season)} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
