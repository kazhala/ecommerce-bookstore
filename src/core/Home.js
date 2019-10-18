import React, { useReducer, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';

const initialState = {
    productSell: [],
    productArrival: [],
    error: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'loadedSold':
            return { ...state, error: '', productSell: action.value };
        case 'loadedArrival':
            return { ...state, error: '', productArrival: action.value };
        case 'error':
            return { ...state, error: action.value };
        default:
            return state;
    }
};

const Home = props => {
    const [productState, dispatch] = useReducer(reducer, initialState);
    const { productArrival, productSell, error } = productState;

    const loadProductsBySell = () => {
        getProducts('sold').then(res => {
            console.log(res);
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'loadedSold', value: res });
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(res => {
            console.log(res);
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'loadedArrival', value: res });
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title={'Home Page'} description={'Node React E-commerce App'}>
            {JSON.stringify(productSell)}
        </Layout>
    );
};

export default Home;
