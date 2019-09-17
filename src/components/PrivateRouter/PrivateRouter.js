import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthorized } from '../../modules/Auth';

class PrivateRouter extends Component {
    renderRoute = routeProps => {
    const { isAuthorized, component: RouteComponent } = this.props;
      return (isAuthorized === true ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to="/" />
      )
    )
  };

  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

export default connect(
    state => ({ isAuthorized: getIsAuthorized(state) }),
    null
)(PrivateRouter);