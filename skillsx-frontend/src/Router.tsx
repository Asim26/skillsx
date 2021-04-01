import React from "react";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Navigation from "./components/navigation/Navigation";
import Courses from "./components/courses/Courses";
import Profile from "./components/profile/Profile";
import Categories from "./components/categories/Categories";
import Course from "./components/courses/Course";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { render } from "@testing-library/react";

import Protected from "./Protected";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/SignUp" exact component={SignUp} />

        <Route path="/Navigation" exact component={Navigation}>
          <Protected Component={Navigation} />
        </Route>

        <Route path="/Courses" exact component={Courses}>
          <Protected Component={Courses} />
        </Route>

        <Route path="/Profile" exact component={Profile} />

        <Route path="/Categories" exact component={Categories} />
        <Route path="/Course" exact component={Course} />
      </Switch>
    </BrowserRouter>
  );
}
