import React, { useReducer, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

const AddProduct = props => {
    return (
        <Layout
            title="Add a new product"
            description="Ready to add a new product?"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">...</div>
            </div>
        </Layout>
    );
};

export default AddProduct;
