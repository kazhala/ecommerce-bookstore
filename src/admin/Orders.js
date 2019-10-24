import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = props => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = (userId, token) => {
            listOrders(userId, token).then(res => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    setOrders(res);
                }
            });
        };
        const { user, token } = isAuthenticated();
        loadOrders(user._id, token);
    }, []);

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

    return (
        <Layout title="Orders" description="Manage orders here">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
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
                                    {order.status}
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
