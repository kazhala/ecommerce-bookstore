import React, { useCallback, useState, useReducer, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import BigSpinner from '../Loaders/BigSpinner';
import ButtonSpinner from '../Loaders/ButtonSpinner';

const initialState = {
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.value };
        case 'description':
            return { ...state, description: action.value };
        case 'price':
            return { ...state, price: action.value };
        case 'category':
            return { ...state, category: action.value };
        case 'shipping':
            return { ...state, shipping: action.value };
        case 'quantity':
            return { ...state, quantity: action.value };
        case 'mount':
            return {
                ...state,
                categories: action.value.data,
                formData: new FormData()
            };
        case 'submit':
            return { ...state, loading: true, error: '' };
        case 'error':
            return { ...state, loading: false, error: action.value };
        case 'success':
            return {
                ...state,
                name: '',
                description: '',
                price: '',
                categories: [],
                category: '',
                shipping: '',
                quantity: '',
                photo: '',
                loading: false,
                error: '',
                createdProduct: action.value.result.name
            };
        case 'newSubmission':
            return {
                ...state,
                error: '',
                createdProduct: ''
            };
        case 'mount1':
            return {
                ...state,
                name: action.payload.name,
                description: action.payload.description,
                price: action.payload.price,
                category: action.payload.category,
                shipping: action.payload.shipping,
                quantity: action.payload.quantity,
                loading: false
            };
        case 'loading':
            return { ...state, loading: true };
        default:
            return state;
    }
};

const UpdateProduct = props => {
    const [formState, dispatch] = useReducer(reducer, initialState);

    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = formState;

    const { match, history } = props;

    //load categories and set form data
    const initCategories = useCallback(() => {
        getCategories().then(res => {
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'mount', value: res });
            }
        });
    }, []);

    const init = useCallback(
        productId => {
            dispatch({ type: 'loading' });
            getProduct(productId).then(res => {
                if (res.error) {
                    dispatch({ type: 'error', value: res.error });
                } else {
                    dispatch({
                        type: 'mount1',
                        payload: {
                            name: res.name,
                            description: res.description,
                            price: res.price,
                            category: res.category._id,
                            shipping: res.shipping ? 1 : 0,
                            quantity: res.quantity
                        }
                    });
                    initCategories();
                }
            });
        },
        [initCategories]
    );

    useEffect(() => {
        if (!success) {
            init(match.params.productId);
        } else if (success) {
            alert('Successfully updated the product');
            history.push('/admin/dashboard');
        }
    }, [success, history, match, init]);

    const handleChange = e => {
        const value = e.target.files ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        dispatch({ type: e.target.name, value: value });
        dispatch({ type: 'newSubmission' });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: 'submit' });
        updateProduct(match.params.productId, user._id, formData, token).then(
            res => {
                if (res.error) {
                    dispatch({ type: 'error', value: res.error });
                    setSuccess(false);
                } else {
                    dispatch({ type: 'success', value: res });
                    setSuccess(true);
                }
            }
        );
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Update Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    type="text"
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                    value={description}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    className="form-control"
                    value={price}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange}
                    name="category"
                    className="form-control"
                    value={category}
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    className="form-control"
                    value={quantity}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange}
                    className="form-control"
                    name="shipping"
                    value={shipping}
                >
                    <option>Please select</option>
                    {categories && (
                        <>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </>
                    )}
                </select>
            </div>
            {loading ? (
                <ButtonSpinner color="btn-outline-primary" />
            ) : (
                <button className="btn btn-outline-primary">
                    Update Product
                </button>
            )}
        </form>
    );

    const showError = () => {
        return error && <div className="alert alert-danger">{error}</div>;
    };

    const showSuccess = () => {
        return (
            createdProduct && (
                <div className="alert alert-info">
                    <h2>{createdProduct} is updated</h2>
                </div>
            )
        );
    };

    const showLoading = () => {
        return loading && <BigSpinner />;
    };

    const goBack = () => (
        <div className="mt-5 mb-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to DashBoard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new product"
            description="Ready to add a new product?"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
