import React, { useReducer, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getBraintreeClientToken } from './apiCore';
import DropIn from 'braintree-web-drop-in-react';

const initialState = {
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'error':
            return { ...state, error: action.value };
        case 'token':
            return { ...state, clientToken: action.value };
        case 'instance':
            return { ...state, instance: action.value };
        case 'clearError':
            return { ...state, error: '' };
        default:
            return state;
    }
};

const Checkout = props => {
    const { products } = props;
    const [checkoutState, dispatch] = useReducer(reducer, initialState);

    const { success, clientToken, error, instance, address } = checkoutState;

    useEffect(() => {
        const getToken = (userId, token) => {
            getBraintreeClientToken(userId, token).then(res => {
                if (res.error) {
                    dispatch({ type: 'error', value: res.error });
                } else {
                    dispatch({ type: 'token', value: res.clientToken });
                }
            });
        };
        const userId = isAuthenticated() && isAuthenticated().user._id;
        const token = isAuthenticated() && isAuthenticated().token;
        getToken(userId, token);
    }, []);

    const getTotal = () => {
        return products
            .reduce((currentValue, nextValue) => {
                return currentValue + nextValue.price * nextValue.count;
            }, 0)
            .toFixed(2);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    const handlePay = () => {
        //send the nounce to the server
        //nouce = instance.requestPaymentMethod()
        let nonce;
        let getNonce = instance
            .requestPaymentMethod()
            .then(res => {
                console.log(res);
                nonce = res.nonce;
                //once get the nonce(card type, card number), send nonce to the backend
                //total to be charged
                console.log(
                    'send nonce and total to process',
                    nonce,
                    getTotal(products)
                );
            })
            .catch(err => {
                console.log('dropIn error', error);
                dispatch({
                    type: 'error',
                    value: err.message
                });
            });
    };

    const showDropIn = () => {
        return (
            <div onBlur={() => dispatch({ type: 'clearError' })}>
                {clientToken && products.length > 0 && (
                    <div>
                        <DropIn
                            options={{
                                authorization: clientToken
                            }}
                            onInstance={instance =>
                                dispatch({ type: 'instance', value: instance })
                            }
                        />
                        <button className="btn btn-success" onClick={handlePay}>
                            Pay
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const showError = error => {
        return error && <div className="alert alert-danger">{error}</div>;
    };

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showError(error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
