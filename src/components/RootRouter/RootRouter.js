import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRouter from '../PrivateRouter';
import LoginForm from '../LoginForm'
import MapBox from '../MapBox'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={LoginForm}/>
            <PrivateRouter path="/mapBox" component={MapBox} />
            <Redirect to='/login' />
        </Switch>
    </BrowserRouter>
);