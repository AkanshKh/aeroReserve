import React from 'react';
import { Link } from 'react-router-dom';
import '../css/layout.css'; 
import '../App.css';

const Layout = ({ children }) => {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/">
                    <img src="/logo.png" height="34" alt="Logo" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bookings">My Bookings</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {/* Assuming user authentication is managed via context or props */}
                        {/* Replace this with appropriate user authentication logic */}
                        {false ? ( // Replace 'false' with actual authentication check
                            <li className="nav-item dropdown my-account">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    My Account
                                </a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" style={{ borderRadius: '25rem' }} onClick={() => window.location.href = '/login'}>
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <main>
                {children}
            </main>
            <footer>
                <div className="container">
                    <div>
                        <div className="logo-container">
                            <img src="/logo.png" alt="Logo" />
                        </div>
                        <h1>footer</h1>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
