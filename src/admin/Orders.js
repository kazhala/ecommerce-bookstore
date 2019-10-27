import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';
import BigSpinner from '../Loaders/BigSpinner';

const Orders = props => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        user: { _id },
        token
    } = isAuthenticated();

    const loadOrders = useCallback((userId, token) => {
        setLoading(true);
        listOrders(userId, token).then(res => {
            setLoading(false);
            if (res.error) {
                console.log(res.error);
            } else {
                setOrders(res.reverse());
            }
        });
    }, []);

    useEffect(() => {
        const loadStatusValue = (userId, token) => {
            getStatusValues(userId, token).then(res => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    setStatusValues(res);
                }
            });
        };
        loadOrders(_id, token);
        loadStatusValue(_id, token);
    }, [loadOrders, _id, token]);

    // console.log('re-rendered');

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const showStatus = order => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {order.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, order._id)}
            >
                <option value={order.status}>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        // console.log('Update order status');
        updateOrderStatus(_id, token, orderId, e.target.value).then(res => {
            if (res.error) {
                console.log('Status update failed');
            } else {
                loadOrders(_id, token);
            }
        });
    };

    const showLoading = loading => {
        return (
            loading && (
                <div
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100vh',
                        zIndex: '10',
                        background: 'none',
                        top: '0',
                        left: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <BigSpinner />
                </div>
            )
        );
    };

    return (
        <Layout title="Orders" description="Manage orders here">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {showLoading(loading)}
                    {orders.map((order, orderIndex) => (
                        <div
                            className="mt-5"
                            key={orderIndex}
                            style={{ borderBottom: '5px solid indigo' }}
                        >
                            <h2 className="mb-5">
                                <span className="bg-primary">
                                    Order ID: {order._id}
                                </span>
                            </h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">
                                    {showStatus(order)}
                                </li>
                                <li className="list-group-item">
                                    Transaction ID: {order.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    Amount: ${order.amount}
                                </li>
                                <li className="list-group-item">
                                    Ordered by: {order.user.name}
                                </li>
                                <li className="list-group-item">
                                    Ordered on:{' '}
                                    {moment(order.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                    Delivery address: {order.address}
                                </li>
                            </ul>

                            <h3 className="mt-4 mb-4 font-italic">
                                Total products in the order:{' '}
                                {order.products.length}
                            </h3>
                            {order.products.map((product, productIndex) => (
                                <div
                                    className="mb-4"
                                    key={productIndex}
                                    style={{
                                        padding: '20px',
                                        border: '1px solid indigo'
                                    }}
                                >
                                    {showInput('Product name', product.name)}
                                    {showInput('Product price', product.price)}
                                    {showInput('Product total', product.count)}
                                    {showInput('Product Id', product._id)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
