import React, { useReducer, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {
    getBraintreeClientToken,
    processPayment,
    createOrder
} from './apiCore';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';
import ButtonSpinner from '../Loaders/ButtonSpinner';

const initialState = {
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    loading: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'error':
            if (action.value === 'User not found') {
                return { ...state, error: 'Please sign in', loading: false };
            }
            return { ...state, loading: false, error: action.value };
        case 'token':
            return { ...state, clientToken: action.value };
        case 'instance':
            return { ...state, instance: action.value };
        case 'clearError':
            return { ...state, error: '', success: false };
        case 'success': {
            return { ...state, success: true };
        }
        case 'loading': {
            return { ...state, loading: !state.loading };
        }
        case 'address': {
            return { ...state, address: action.value };
        }
        default:
            return state;
    }
};

const Checkout = props => {
    const { products, setCartItems } = props;
    const [checkoutState, dispatch] = useReducer(reducer, initialState);

    const {
        success,
        loading,
        clientToken,
        error,
        instance,
        address
    } = checkoutState;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

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
        getToken(userId, token);
    }, [userId, token]);

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
        dispatch({ type: 'loading' });
        //send the nounce to the server
        //nouce = instance.requestPaymentMethod()
        let nonce;
        let getNonce = instance
            .requestPaymentMethod()
            .then(res => {
                // console.log(res);
                nonce = res.nonce;
                //once get the nonce(card type, card number), send nonce to the backend
                //total to be charged
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                processPayment(userId, token, paymentData)
                    .then(res => {
                        const orderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: address
                        };
                        createOrder(userId, token, orderData).then(res => {
                            setCartItems([]);
                            emptyCart(() => dispatch({ type: 'loading' }));
                            dispatch({ type: 'success' });
                        });
                    })
                    .catch(err => {
                        // console.log(err);
                        dispatch({ type: 'error', value: err });
                    });
            })
            .catch(err => {
                // console.log('dropIn error', error);
                dispatch({
                    type: 'error',
                    value: err.message
                });
            });
    };

    const handleAddress = e => {
        dispatch({ type: 'address', value: e.target.value });
    };

    const showDropIn = () => {
        return (
            <div onBlur={() => dispatch({ type: 'clearError' })}>
                {clientToken && products.length > 0 && (
                    <div>
                        <div className="form-group mb-3">
                            <label className="text-muted">
                                Delivery address:{' '}
                            </label>
                            <textarea
                                onChange={handleAddress}
                                className="form-control"
                                required
                                value={address}
                                placeholder="Please enter your delivery address"
                            />
                        </div>
                        <DropIn
                            options={{
                                authorization: clientToken,
                                paypal: {
                                    flow: 'vault'
                                }
                            }}
                            onInstance={instance =>
                                dispatch({ type: 'instance', value: instance })
                            }
                        />
                        {loading ? (
                            <ButtonSpinner color="btn-success" block />
                        ) : (
                            <button
                                className="btn btn-success btn-block"
                                onClick={handlePay}
                            >
                                Pay
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const showSuccess = success => {
        return (
            success && (
                <div className="alert alert-info">
                    Thank you, payment was successful!
                </div>
            )
        );
    };

    const showError = error => {
        return error && <div className="alert alert-danger">{error}</div>;
    };

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(success)}
            {showError(error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
