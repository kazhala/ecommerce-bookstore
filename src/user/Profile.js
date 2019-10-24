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
        default:
            return state;
    }
};

const Profile = props => {
    const [userState, dispatch] = useReducer(reducer, initialState);
    const { name, email, password, error, success } = userState;

    useEffect(() => {
        const init = userId => {
            console.log(userId);
        };

        init(props.match.params.userId);
    }, []);

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className="container-fluid"
        >
            <h2 className="mb-4">Profile update</h2>
        </Layout>
    );
};

export default Profile;
