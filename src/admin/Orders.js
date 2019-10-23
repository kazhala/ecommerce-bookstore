import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders } from './apiAdmin';

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

    const noOrders = () => {
        return orders.length < 1 && <h4>No orders</h4>;
    };

    return (
        <Layout title="Orders" description="Manage orders here">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {noOrders()}
                    {JSON.stringify(orders)}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
