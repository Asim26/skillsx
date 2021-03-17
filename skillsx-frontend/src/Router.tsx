import React from "react";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Navigation from "./components/navigation/Navigation";

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function AppRouter() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/Navigation" exact component={Navigation} />
        </Switch>
      </BrowserRouter>
  );
}