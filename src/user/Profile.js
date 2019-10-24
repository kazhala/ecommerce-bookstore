import React, { useReducer, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const initialState = {
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'error':
            return { ...state, error: action.value };
        case 'userData':
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            };
        case 'name':
            return { ...state, error: '', name: action.value };
        case 'email':
            return { ...state, error: '', email: action.value };
        case 'password':
            return { ...state, error: '', password: action.value };
        case 'updateSuccess':
            return {
                ...state,
                error: '',
                success: true,
                name: action.payload.name,
                email: action.payload.email
            };
        default:
            return state;
    }
};

const { token } = isAuthenticated();

const Profile = props => {
    const [userState, dispatch] = useReducer(reducer, initialState);
    const { name, email, password, error, success } = userState;

    useEffect(() => {
        const init = userId => {
            read(userId, token).then(res => {
                if (res.error) {
                    dispatch({ type: 'error', value: res.error });
                } else {
                    dispatch({
                        type: 'userData',
                        payload: { name: res.name, email: res.email }
                    });
                }
            });
        };

        init(props.match.params.userId);
    }, []);

    const handleChange = (e, value) => {
        dispatch({ type: value, value: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        update(props.match.params.userId, token, {
            name,
            email,
            password
        }).then(res => {
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                updateUser(res, () => {
                    dispatch({
                        type: 'updateSuccess',
                        payload: {
                            name: res.name,
                            email: res.email
                        }
                    });
                });
            }
        });
    };

    useEffect(() => {
        const redirectUser = success => {
            if (success) {
                props.history.push('/user/dashboard');
            }
        };
        redirectUser(success);
    }, [success]);

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={e => handleChange(e, 'name')}
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="text"
                    onChange={e => handleChange(e, 'email')}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="text"
                    onChange={e => handleChange(e, 'password')}
                    className="form-control"
                    value={password}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className="container-fluid"
        >
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password)}
        </Layout>
    );
};

export default Profile;
