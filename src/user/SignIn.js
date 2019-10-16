import React, { useReducer } from 'react';
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import { signUserIn } from '../auth';

const initialState = {
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferer: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.value, error: '' };
        case 'password':
            return { ...state, password: action.value, error: '' };
        case 'submit': {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case 'error':
            return {
                ...state,
                error: action.value,
                loading: false
            };
        case 'success':
            return {
                ...state,
                redirectToReferer: true
            };
        default:
            return state;
    }
};

const SignIn = props => {
    const [inputState, dispatch] = useReducer(reducer, initialState);

    const handleChange = e => {
        dispatch({ type: e.target.name, value: e.target.value });
    };

    const handleSubmit = e => {
        const { email, password } = inputState;
        dispatch({ type: 'submit' });
        e.preventDefault();
        signUserIn(email, password).then(data => {
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

    const showLoading = () => {
        return (
            inputState.loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const redirectUser = () => {
        if (inputState.redirectToReferer) {
            return <Redirect to="/" />;
        }
    };

    const signInForm = () => (
        <form>
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
                Login
            </button>
        </form>
    );

    return (
        <Layout
            title={'Sign Up'}
            description={'SignUp from Node React E-commerce App'}
            className={'container col-md-8 offset-md-2'}
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
};

export default SignIn;
