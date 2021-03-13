import React from "react";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function AppRouter() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/SignUp" exact component={SignUp} />
        </Switch>
      </BrowserRouter>
  );
}