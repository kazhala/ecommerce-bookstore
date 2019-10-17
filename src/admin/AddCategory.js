import React, { useReducer } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

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
                name: action.value
            };
        case 'start':
            return {
                ...state,
                error: '',
                success: false
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
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    return (
        <Layout
            title="Add a new category"
            description="Ready to add a new category?"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
            </div>
        </Layout>
    );
};

export default AddCategory;
