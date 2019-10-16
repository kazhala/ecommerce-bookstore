import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import UserDashBoard from './user/UserDashBoard';

const Routes = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <PrivateRoute
                    path="/dashboard"
                    exact
                    component={UserDashBoard}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
