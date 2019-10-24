import React from 'react';

const ButtonSpinner = props => (
    <button
        className={`btn ${props.color} ${props.block ? 'btn-block' : null}`}
        type="button"
        disabled
    >
        <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
        ></span>
        Loading...
    </button>
);

export default ButtonSpinner;
