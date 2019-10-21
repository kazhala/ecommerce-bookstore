import React from 'react';

const Checkout = props => {
    const { products } = props;

    return <div>{JSON.stringify(products)}</div>;
};

export default Checkout;
