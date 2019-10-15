import React, { useReducer } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signUserUp } from '../auth';

const initialState = {
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.value,
                error: ''
            };
        case 'email':
            return { ...state, email: action.value, error: '' };
        case 'password':
            return { ...state, password: action.value, error: '' };
        case 'error':
            return {
                ...state,
                error: action.value,
                success: false
            };
        case 'success':
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                error: '',
                success: true
            };
        default:
            return state;
    }
};

const SignUp = props => {
    const [inputState, dispatch] = useReducer(reducer, initialState);

    const handleChange = e => {
        dispatch({ type: e.target.name, value: e.target.value });
    };

    const handleSubmit = e => {
        const { name, email, password } = inputState;
        e.preventDefault();
        signUserUp(name, email, password).then(data => {
            console.log(data);
            if (data.error) {
                dispatch({ type: 'error', value: data.error });
            } else {
                dispatch({ type: 'success' });
            }
        });
    };

    const showError = () => {
        return (
            inputState.error && (
                <div className="alert alert-danger">{inputState.error}</div>
            )
        );
    };

    const showSuccess = () => {
        return (
            inputState.success && (
                <div className="alert alert-info">
                    New account is created, please{' '}
                    <Link to="/signin">sign in</Link>
                </div>
            )
        );
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    value={inputState.name}
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    name="email"
                    value={inputState.email}
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    name="password"
                    value={inputState.password}
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout
            title={'Sign Up'}
            description={'SignUp from Node React E-commerce App'}
            className={'container col-md-8 offset-md-2'}
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default SignUp;
