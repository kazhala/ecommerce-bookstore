import React, { useReducer, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import BigSpinner from '../Loaders/BigSpinner';

const initialState = {
    productSell: [],
    productArrival: [],
    error: '',
    loading: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'loadedSold':
            return {
                ...state,
                loading: false,
                error: '',
                productSell: action.value
            };
        case 'loadedArrival':
            return {
                ...state,
                loading: false,
                error: '',
                productArrival: action.value
            };
        case 'error':
            return { ...state, error: action.value };
        case 'loading':
            return { ...state, loading: true };
        default:
            return state;
    }
};

const Home = props => {
    const [productState, dispatch] = useReducer(reducer, initialState);
    const { loading, productArrival, productSell, error } = productState;

    const loadProductsBySell = () => {
        dispatch({ type: 'loading' });
        getProducts('sold').then(res => {
            if (res.error) {
                dispatch({ type: 'error', value: res.error });
            } else {
                dispatch({ type: 'loadedSold', value: res });
            }
        });
    };

    const loadProductsByArrival = () => {
        dispatch({ type: 'loading' });
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

    const showError = () => {
        return error && <div className="alert alert-danger">{error}</div>;
    };

    return (
        <Layout
            title={'Home Page'}
            description={'Node React E-commerce App'}
            className="container-fluid"
        >
            <Search />
            {showError()}
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {loading ? (
                    <BigSpinner />
                ) : (
                    productArrival.map((product, index) => (
                        <div className="col-4 mb-3" key={index}>
                            <Card product={product} />
                        </div>
                    ))
                )}
            </div>
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {loading ? (
                    <BigSpinner />
                ) : (
                    productSell.map((product, index) => (
                        <div className="col-4 mb-3" key={index}>
                            <Card product={product} />
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
};

export default Home;
