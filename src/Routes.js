import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute';
import Register from './containers/Register';

import Home from './containers/Home';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
      <AppliedRoute path="/register" exact component={Register} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);