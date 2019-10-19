import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProduct } from './apiCore';
import CheckBox from './CheckBox';
import { prices } from './FixedPrices';
import RadioBox from './RadioBox';

const Shop = props => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });

    const [filteredResults, setFilteredResults] = useState(null);

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
            if (filterBy === 'price') {
                let priceValues = handlePrice(filters);
                newFilters.filters[filterBy] = priceValues;
            }
            return newFilters;
        });
    };

    useEffect(() => {
        const loadFilteredResult = (skip, limit, newFilters) => {
            getFilteredProduct(skip, limit, newFilters.filters).then(res => {
                // console.log(res);
                if (res.error) {
                    setError(res.error);
                } else {
                    setFilteredResults(res);
                }
            });
        };
        loadFilteredResult(skip, limit, myFilters);
    }, [skip, limit, myFilters]);

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
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
