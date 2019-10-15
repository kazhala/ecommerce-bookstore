import React, { useReducer } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

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
                name: action.value
            };
        case 'email':
            return { ...state, email: action.value };
        case 'password':
            return { ...state, password: action.value };
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
        signUserUp(name, email, password);
    };

    const signUserUp = (name, email, password) => {
        fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            });
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
            {signUpForm()}
            {JSON.stringify(inputState)}
        </Layout>
    );
};

export default SignUp;
