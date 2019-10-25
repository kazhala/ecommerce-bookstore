import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getProducts, deleteProduct } from './apiAdmin';
import { Link } from 'react-router-dom';
import BigSpinner from '../Loaders/BigSpinner';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, token } = isAuthenticated();

    const destroy = productId => {
        setLoading(true);
        deleteProduct(user._id, productId, token).then(res => {
            if (res.error) {
                setLoading(false);
                console.log(res.error);
            } else {
                loadProducts();
            }
        });
    };

    const loadProducts = useCallback(() => {
        setLoading(true);
        getProducts().then(res => {
            setLoading(false);
            if (res.error) {
                console.log(res.error);
            } else {
                setProducts(res);
            }
        });
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {products.map((product, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{product.name}</strong>
                                <Link
                                    to={`/admin/product/update/${product._id}`}
                                >
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    className="badge badge-danger badge-pill"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => destroy(product._id)}
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    {loading && <BigSpinner />}
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
