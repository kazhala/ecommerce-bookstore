export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count: 1
        });

        /**
         * remove duplicates new Set
         * build an array from new set and turn it back into array using array using array. from
         * to re map
         * then get the id from the new array and use the old cart to find the actual object
         * and store it
         */

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.forEach((product, index) => {
            if (product._id === productId) {
                cart[index].count = count;
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const removeItem = productId => {
    let cart = [];
    let newCart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        newCart = cart.filter(product => product._id !== productId);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
    return newCart;
};

export const emptyCart = next => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart');
        next();
    }
};
