import React from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = props => {
    const { products } = props;

    const getTotal = () => {
        return products
            .reduce((currentValue, nextValue) => {
                return currentValue + nextValue.price * nextValue.count;
            }, 0)
            .toFixed(2);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    );
};

export default Checkout;
