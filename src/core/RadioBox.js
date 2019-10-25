import React from 'react';

const RadioBox = props => {
    const { prices, handleFilters } = props;
    // const [value, setValue] = useState(0);

    const handleChange = e => {
        //call parent functiont o set filters
        handleFilters(e.target.value, 'price');
        // setValue(e.target.value);
    };

    return prices.map((price, index) => (
        <div key={index}>
            <input
                type="radio"
                onChange={handleChange}
                value={price._id}
                name={price}
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{price.name}</label>
        </div>
    ));
};

export default RadioBox;
