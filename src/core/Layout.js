/**
 * layout for all pages, hoc component
 */
import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = props => {
    const {
        title = 'Title',
        description = 'Description',
        children,
        className,
        length
    } = props;
    return (
        <div>
            <Menu length={length} />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default Layout;
