import React from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const SignIn = props => {
    return (
        <Layout
            title={'SignIn'}
            description={'SignIn to Node React E-commerce App'}
        >
            {API}
        </Layout>
    );
};

export default SignIn;
