/**
 * price filter option
 */
export const prices = [
    {
        _id: 0,
        name: 'Any',
        array: []
    },
    {
        _id: 1,
        name: '$0-$9',
        array: [0, 9.99]
    },
    {
        _id: 2,
        name: '$10-$19',
        array: [10, 19.99]
    },
    {
        _id: 3,
        name: '$20-$29',
        array: [20, 29.99]
    },
    {
        _id: 4,
        name: '$30-$39',
        array: [30, 39.99]
    },
    {
        _id: 5,
        name: 'More than $40',
        array: [40, 99.99]
    }
];
