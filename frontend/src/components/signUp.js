import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css';
import '../App.css';
const SignUp = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmation: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform sign-up logic here
        // If successful, redirect to login page or dashboard:
        navigate('/login');
    };

    const { firstname, lastname, username, email, password, confirmation } = formData;
    const isFormValid = firstname && lastname && username && email && password && confirmation && password === confirmation;

    return (
        <div className="user-box" style={{ marginTop: '6vh' }}>
            <div>
                <center>
                    <img src="/logo.png" alt="Logo" height="35em" style={{ marginBottom: '2vh' }} />
                    <h3>Sign up for Flight</h3><br />
                </center>
            </div>
            <form onSubmit={handleSubmit} id="signin-form" style={{ width: '100%', marginBottom: '5vh' }}>
                <div className="form-group">
                    <div className="form-row align-items-center">
                        <div className="col-sm-6 my-1">
                            <input
                                className="form-control inp fname"
                                type="text"
                                name="firstname"
                                placeholder="First Name *"
                                autoComplete="new-password"
                                autoFocus
                                value={firstname}
                                onChange={handleChange}
                            />
                            <span className="star small"></span>
                        </div>
                        <div className="col-sm-6 my-1">
                            <input
                                className="form-control inp lname"
                                type="text"
                                name="lastname"
                                placeholder="Last Name *"
                                autoComplete="new-password"
                                value={lastname}
                                onChange={handleChange}
                            />
                            <span className="star small"></span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        className="form-control inp usrname"
                        type="text"
                        name="username"
                        placeholder="Username *"
                        autoComplete="new-password"
                        value={username}
                        onChange={handleChange}
                    />
                    <span className="star small">{message}</span>
                </div>
                <div className="form-group">
                    <input
                        className="form-control inp email"
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        autoComplete="new-password"
                        value={email}
                        onChange={handleChange}
                    />
                    <span className="star small"></span>
                </div>
                <div className="form-group">
                    <input
                        className="form-control inp pswd"
                        type="password"
                        name="password"
                        placeholder="Password *"
                        autoComplete="new-password"
                        value={password}
                        onChange={handleChange}
                    />
                    <span className="star small"></span>
                </div>
                <div className="form-group">
                    <input
                        className="form-control inp cpswd"
                        type="password"
                        name="confirmation"
                        placeholder="Confirm Password *"
                        autoComplete="new-password"
                        value={confirmation}
                        onChange={handleChange}
                    />
                    <span className="star small"></span>
                </div>
                <center>
                    <input
                        className="btn btn-danger"
                        type="submit"
                        value="Sign Up"
                        style={{ marginTop: '10px', width: '95%' }}
                        disabled={!isFormValid}
                    />
                </center>
            </form>
            <div>
                <center>
                    Already have an account?&nbsp;&nbsp;<Link to="/login">Log in</Link>
                </center>
            </div><br /><br />
        </div>
    );
};

export default SignUp;
