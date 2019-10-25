import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const ManageProducts = () => {
    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row">
                <div>...</div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
