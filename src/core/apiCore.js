import { API } from '../config';

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
