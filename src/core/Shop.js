import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import CheckBox from './CheckBox';
import { prices } from './FixedPrices';
import RadioBox from './RadioBox';

const Shop = props => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });

    const init = () => {
        getCategories().then(res => {
            if (res.error) {
                setError(res.error);
            } else {
                setCategories(res.data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleFilters = (filters, filterBy) => {
        setMyFilters(prevFilter => {
            const newFilters = { ...prevFilter };
            newFilters.filters[filterBy] = filters;
            return newFilters;
        });
    };

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Categories</h4>
                    <ul>
                        <CheckBox
                            handleFilters={handleFilters}
                            categories={categories}
                        />
                    </ul>
                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={handleFilters}
                        />
                    </div>
                </div>
                <div className="col-8">right side</div>
            </div>
        </Layout>
    );
};

export default Shop;
