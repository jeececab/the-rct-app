import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ROUTES from '../../constants/routes';

export default function(ComposedComponent, nonAuth) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.authenticated === null && !nonAuth) {
        this.context.router.history.push('/');
      } else if (this.props.authenticated && nonAuth) {
        this.context.router.history.push(ROUTES.ACCOUNT);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated && !nonAuth) {
        this.context.router.history.push('/');
      } else if (nextProps.authenticated && nonAuth) {
        this.context.router.history.push(ROUTES.ACCOUNT)
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      } else if (!this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}