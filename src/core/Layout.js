import React from 'react';

const Layout = props => {
    const {
        title = 'Title',
        description = 'Description',
        children,
        className
    } = props;
    return (
        <div>
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default Layout;
