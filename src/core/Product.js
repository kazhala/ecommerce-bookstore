import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const { match } = props;

    useEffect(() => {
        const loadSingleProduct = productId => {
            read(productId).then(res => {
                if (res.error) {
                    setError(res.error);
                } else {
                    setProduct(res);
                }
            });
        };
        const productId = match.params.productId;
        loadSingleProduct(productId);
    }, [match]);

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <div className="row">
                {product && product.description && (
                    <Card product={product} showViewProductButton={false} />
                )}
            </div>
        </Layout>
    );
};

export default Product;
