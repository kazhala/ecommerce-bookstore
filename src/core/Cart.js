import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = props => {
    const [items, setItems] = useState([]);

    const [length, setLength] = useState(0);

    useEffect(() => {
        setItems(getCart());
    }, []);

    useEffect(() => {
        setLength(items.length);
    }, [items]);

    const showItems = () => {
        return (
            <div>
                <h2>
                    Your cart has {`${items.length}`}{' '}
                    {items.length === 1 ? 'item' : 'items'}
                </h2>
                <hr />
                {items.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        showAddToCart={false}
                        cartUpdate={true}
                        showRemoveProduct={true}
                        setCartItems={setItems}
                    />
                ))}
            </div>
        );
    };

    const noItemMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>{' '}
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items, Add remove checkout or continue shopping"
            className="container-fluid"
            length={length}
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems() : noItemMessage()}
                </div>
                <div className="col-6">
                    <h2>Your cart summary</h2>
                    <hr />
                    <Checkout products={items} setCartItems={setItems} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
