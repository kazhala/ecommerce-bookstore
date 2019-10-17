import React, { useReducer } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const initialState = {
    name: '',
    error: '',
    success: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                error: '',
                name: action.value,
                success: false
            };
        case 'start':
            return {
                ...state,
                error: '',
                success: false
            };
        case 'fail':
            return {
                ...state,
                error: action.value,
                success: false
            };
        case 'success':
            return {
                ...state,
                error: '',
                success: true
            };
        default:
            return state;
    }
};

const AddCategory = props => {
    const [categoryState, dispatch] = useReducer(reducer, initialState);

    const { user, token } = isAuthenticated();

    const handleChange = e => {
        dispatch({
            type: 'name',
            value: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: 'start' });
        createCategory(user._id, token, { name: categoryState.name }).then(
            res => {
                if (res.error) {
                    dispatch({ type: 'fail', value: res.error });
                } else {
                    dispatch({ type: 'success' });
                }
            }
        );
    };

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={categoryState.name}
                    autoFocus
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (categoryState.success) {
            return (
                <h3 className="text-success">
                    {categoryState.name} is created
                </h3>
            );
        }
    };

    const showError = () => {
        if (categoryState.error) {
            return <h3 className="text-danger">Category already exists!</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to DashBoard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description="Ready to add a new category?"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;
