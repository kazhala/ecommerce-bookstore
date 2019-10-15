import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' };
    } else {
        return { color: '#ffffff' };
    }
};

const Menu = props => {
    const { history } = props;
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to="/"
                        style={isActive(history, '/')}
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to="/signin"
                        style={isActive(history, '/signin')}
                    >
                        SignIn
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to="/signup"
                        style={isActive(history, '/signup')}
                    >
                        SignUp
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default withRouter(Menu);
