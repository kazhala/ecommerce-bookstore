/**
 * The container of the entire website
 * React Router to only display one page
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import UserDashBoard from './user/UserDashBoard';
import AdminRoute from './auth/AdminRoute';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

const Routes = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/shop" exact component={Shop} />
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={UserDashBoard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashBoard}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
