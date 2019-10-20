import React, { useReducer, useEffect } from 'react';
import { getCategories } from './apiCore';

const initialState = {
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'categories':
            return { ...state, categories: action.value };
        default:
            return state;
    }
};

const Search = props => {
    const [searchData, dispatch] = useReducer(reducer, initialState);

    const { categories, category, search, results, searched } = searchData;

    const loadCategories = () => {
        getCategories().then(res => {
            if (res.error) {
                console.log(res.error);
            } else {
                dispatch({ type: 'categories', value: res.data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchSubmit = () => {};
    const handleChange = () => {};

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange}
                            name="category"
                        >
                            <option value="All">Pick Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        name="search"
                        onChange={handleChange}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: 'none' }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container">{searchForm()}</div>
        </div>
    );
};

export default Search;
