/**
 * Route that only admin could access
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        // get the props e.g. exact path name
        {...rest}
        render={props => {
            return isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />
            );
        }}
    />
);

export default AdminRoute;
