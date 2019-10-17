import { API } from '../config';
export const signUserUp = async (name, email, password) => {
    try {
        const res = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const signUserIn = async (email, password) => {
    try {
        const res = await fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signUserOut = async next => {
    if (typeof window !== undefined) {
        localStorage.removeItem('jwt');
        next();
        try {
            const res = await fetch(`${API}/signout`, {
                method: 'GET'
            });
            console.log('Sign out', res);
        } catch (err) {
            console.log(err);
        }
    }
};

export const isAuthenticated = () => {
    if (typeof window === undefined) {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
