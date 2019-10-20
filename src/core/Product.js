import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const { match } = props;

    useEffect(() => {
        const loadSingleProduct = productId => {
            read(productId).then(res => {
                if (res.error) {
                    setError(res.error);
                } else {
                    setProduct(res);
                    listRelated(res._id).then(res => {
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
