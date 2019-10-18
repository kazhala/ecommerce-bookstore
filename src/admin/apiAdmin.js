import { API } from '../config';

export const createCategory = async (userId, token, category) => {
    try {
        const res = await fetch(`${API}/category/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const createProduct = async (userId, token, product) => {
    try {
        const res = await fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        });
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
