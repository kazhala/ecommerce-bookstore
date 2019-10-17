/**
 * API calls to the backend, and return the data retrieved
 */
import { API } from '../config';
export const signUserUp = async (name, email, password) => {
    try {
        //get the promise back from the api call
        const res = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        //return the data
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

//get the user data from localstorage and perform call back (verify)
export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

//clear the data from localStorage and perform call back (redirect to home page)
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

//get the authenticated user detail from local storage(work around for redux)
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
