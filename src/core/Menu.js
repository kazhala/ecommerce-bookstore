import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signUserOut, isAuthenticated } from '../auth';

//check for active tabs
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
                        to="/shop"
                        style={isActive(history, '/shop')}
                    >
                        Shop
                    </Link>
                </li>
                {/* display normal dashboard for general user */}
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/user/dashboard"
                            style={isActive(history, '/user/dashboard')}
                        >
                            Dashboard
                        </Link>
                    </li>
                )}
                {/* only admin could have access */}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/admin/dashboard"
                            style={isActive(history, '/admin/dashboard')}
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {/* only display to non authenticated user */}
                {!isAuthenticated() && (
                    <>
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
                    </>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#ffffff' }}
                            onClick={() =>
                                signUserOut(() => {
                                    history.push('/');
                                })
                            }
                        >
                            Logout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default withRouter(Menu);
