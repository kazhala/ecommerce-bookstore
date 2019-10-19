import React, { useReducer, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

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
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'loadedSold', value: res });
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(res => {
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'loadedArrival', value: res });
            }
        });
    };

    //on mount, call api to load products
    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title={'Home Page'}
            description={'Node React E-commerce App'}
            className="container-fluid"
        >
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productArrival.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productSell.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
        </Layout>
    );
};

export default Home;
