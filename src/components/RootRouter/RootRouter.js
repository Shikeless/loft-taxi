import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRouter from "../PrivateRouter";
import LoginForm from "../LoginForm";
import MapBox from "../MapBox";
import Header from "../Header";
import Profile from "../Profile";

export default () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path="/login" component={LoginForm} />
            <PrivateRouter exact path="/mapBox" component={MapBox} />
            <PrivateRouter exact path="/profile" component={Profile} />
            <Redirect path="/" exact to="/login" />
        </Switch>
    </BrowserRouter>
);
