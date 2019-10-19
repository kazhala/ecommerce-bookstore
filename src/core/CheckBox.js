/**
 * check box for filter bar
 */
import React, { useState, useEffect } from 'react';

const CheckBox = props => {
    const { categories, handleFilters } = props;
    //array to keep track which box are clicked
    const [checked, setChecked] = useState([]);

    const handleToggle = categoryId => {
        const currentCategoryId = checked.indexOf(categoryId);
        const newCategoryId = [...checked];
        //not found, push it in : found it, splice it out
        if (currentCategoryId === -1) {
            newCategoryId.push(categoryId);
        } else {
            newCategoryId.splice(currentCategoryId, 1);
        }
        setChecked(newCategoryId);
        //call parent function handle filter action
        handleFilters(newCategoryId, 'category');
    };

    return categories.map((category, index) => (
        <li className="list-unstyled" key={index}>
            <input
                type="checkbox"
                value={checked.indexOf(category._id) === -1}
                className="form-check-input"
                onChange={() => handleToggle(category._id)}
            />
            <label className="form-check-label">{category.name}</label>
        </li>
    ));
};

export default CheckBox;
