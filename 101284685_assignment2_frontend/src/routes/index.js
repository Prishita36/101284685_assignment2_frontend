import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from '@Pages/Dashboard';
import EditEmployee from '@Pages/EditEmployee';

const RouterComp = () => (
  <Router>
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/employee/:id" component={EditEmployee} exact />
    </Switch>
  </Router>
);

export default RouterComp;
