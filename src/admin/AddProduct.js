import React, { useReducer, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

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
            return { ...state, category: action.value };
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
        default:
            return state;
    }
};

const AddProduct = props => {
    const [formState, dispatch] = useReducer(reducer, initialState);
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
        formData,
        redirectToProfile
    } = formState;

    //load categories and set form data
    const init = () => {
        getCategories().then(res => {
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'mount', value: res });
            }
        });
    };

    useEffect(() => {
        init();
    }, [createdProduct]);

    const handleChange = e => {
        const value = e.target.files ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        dispatch({ type: e.target.name, value: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: 'submit' });
        createProduct(user._id, token, formData).then(res => {
            console.log(res);
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'success', value: res });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Post Photo</h4>
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
                >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Crate Product</button>
        </form>
    );

    const showError = () => {
        return error && <div className="alert alert-danger">{error}</div>;
    };

    const showSuccess = () => {
        return (
            createdProduct && (
                <div className="alert alert-info">
                    <h2>{createdProduct} is created</h2>
                </div>
            )
        );
    };

    const showLoading = () => {
        return loading && <div className="alert alert-success">Loading...</div>;
    };

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
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
