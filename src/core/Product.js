import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import BigSpinner from '../Loaders/BigSpinner';

const Product = props => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { match } = props;

    useEffect(() => {
        const loadSingleProduct = productId => {
            setLoading(true);
            read(productId).then(res => {
                if (res.error) {
                    setLoading(false);
                    setError(res.error);
                } else {
                    setProduct(res);
                    listRelated(res._id).then(res => {
                        setLoading(false);
                        if (res.error) {
                            setError(res.error);
                        } else {
                            setRelatedProduct(res);
                        }
                    });
                }
            });
        };
        const productId = match.params.productId;
        loadSingleProduct(productId);
    }, [match]);

    // console.log(relatedProduct);

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
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100vh',
                        top: '0',
                        left: '0',
                        zIndex: '100',
                        background: '#ccc',
                        opacity: '0.7'
                    }}
                >
                    <BigSpinner />
                </div>
            )}
            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}
                </div>
                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((product, index) => (
                        <div className="mb-3" key={index}>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
