import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import CheckBox from './CheckBox';

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
                </div>
                <div className="col-8">right side</div>
            </div>
        </Layout>
    );
};

export default Shop;
