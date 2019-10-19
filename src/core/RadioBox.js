import React, { useState, useEffect } from 'react';

const RadioBox = props => {
    const { prices } = props;
    const [value, setValue] = useState(0);

    const handleChange = () => {};

    return prices.map((price, index) => (
        <div key={index}>
            <input
                type="radio"
                onChange={handleChange}
                value={price._id}
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{price.name}</label>
        </div>
    ));
};

export default RadioBox;
