/**
 * Card component to display each product
 * TODO: potentially add withRouter hoc to redirect
 */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCart = true,
    cartUpdate = false,
    showRemoveProduct = false,
    setCartItems
}) => {
    const [redirect, setRedirect] = useState(false);

    const [count, setCount] = useState(product.count ? product.count : 0);

    const showViewButton = () => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCartButton = show => {
        return (
            show && (
                <button
                    className="btn btn-outline-warning mt-2 mb-2"
                    onClick={addToCart}
                    disabled={product.quantity > 0 ? false : true}
                    style={{ backgroundColor: product.quantity <= 0 && '#eee' }}
                >
                    {product.quantity > 0 ? 'Add to cart' : 'Out of stock'}
                </button>
            )
        );
    };

    const handleChange = (e, product) => {
        let newCount = 1;
        // console.log(e.target.value);
        if (e.target.value > 1) {
            if (e.target.value > product.quantity) {
                newCount = count;
            } else {
                newCount = e.target.value;
            }
        }
        setCount(newCount);
        if (e.target.value >= 1) {
            const updatedItem = updateItem(product._id, newCount);
            setCartItems(updatedItem);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={e => handleChange(e, product)}
                        />
                    </div>
                </div>
            )
        );
    };

    const handleRemove = () => {
        const newItems = removeItem(product._id);
        setCartItems(newItems);
    };

    const showRemoveProductButton = showRemoveProduct => {
        return (
            showRemoveProduct && (
                <button
                    onClick={handleRemove}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-warning badge-pill">Out of Stock</span>
        );
    };

    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">
                    {product.description.substring(0, 100)}
                </p>
                <p className="black-10">${product.price}</p>
                <p className="black-9">
                    Category: {product.category && product.category.name}
                </p>
                <p className="black-8">
                    Added {moment(product.createdAt).fromNow()}
                </p>
                {showStock(product.quantity)}
                <br />
                {showViewButton()}
                {showAddToCartButton(showAddToCart)}
                {showRemoveProductButton(showRemoveProduct)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;
