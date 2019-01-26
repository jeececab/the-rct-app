import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ROUTES from '../../constants/routes';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.authenticated === null) {
        this.context.router.history.push(ROUTES.LANDING);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push(ROUTES.LANDING);
      }
    }

    render() {
      if (this.props.authenticated) {
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