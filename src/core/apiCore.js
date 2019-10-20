/**
 * API call actions for the core components
 */
import { API } from '../config';
import queryString from 'query-string';

export const getProducts = async sortBy => {
    try {
        const res = await fetch(
            `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
            {
                method: 'GET'
            }
        );
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(`${API}/categories`, {
            method: 'GET'
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const getFilteredProduct = async (skip, limit, filters = {}) => {
    try {
        const data = { limit, skip, filters };
        const res = await fetch(`${API}/products/by/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const list = async params => {
    try {
        const query = queryString.stringify(params);
        console.log(query);
        const res = await fetch(`${API}/products/search?${query}`, {
            method: 'GET'
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};
