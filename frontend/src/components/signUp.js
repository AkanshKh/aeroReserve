import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../css/signUp.css';
import '../App.css';



const SignUp = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmation: ''
    });
    const [message, setMessage] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword);
    };

    const validateUsername = (name) => {
        if (!usernameRegex.test(name)) {
            return 'Username must be 3-16 characters long and can only contain letters, numbers, underscores, and dots.';
        }
        return '';
    };

    const validatePassword = (pass) => {
        if (!passwordRegex.test(pass)) {
            return 'Password must be 8-20 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
        return '';
    };

    const validateMatch = (pass , conf) => {
        if(pass !== conf){
            return 'Passwords do not match';
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/api/register/';
        // console.log(formData);
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if(response.status === 200){
                // console.log("done")
                navigate('/login');
            }
            else if(response.status === 400){
                // console.log("error")
                const errorData = await response.json();
                // console.log(errorData);
                setMessage(errorData.message);
            }
            else{
                setMessage('An error occurred. Please try again.');
            }
        }
        catch(error){
            console.log(error);
            setMessage('No connection to the server. Please try again later.');
        }

    };

    const { first_name, last_name, username, email, password, confirmation } = formData;
    const isFormValid = first_name && last_name && username && email && password && confirmation && password === confirmation;

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
                                name="first_name"
                                placeholder="First Name *"
                                autoComplete="new-password"
                                autoFocus
                                value={first_name}
                                onChange={handleChange}
                            />
                            <span className="star small"></span>
                        </div>
                        <div className="col-sm-6 my-1">
                            <input
                                className="form-control inp lname"
                                type="text"
                                name="last_name"
                                placeholder="Last Name *"
                                autoComplete="new-password"
                                value={last_name}
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
                    <p className={validateUsername(username) && username ? "small" : "offscreen"} style={{ color: 'red' }}>{validateUsername(username)}</p>
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
                <div className="password-wrapper">
                    <input
                        className="form-control inp pswd"
                        type={togglePassword ? "text" : "password"}
                        name="password"
                        placeholder="Password *"
                        autoComplete="new-password"
                        value={password}
                        onChange={handleChange}
                    />
                    <span className="password-toggle-icon" onClick={handleTogglePassword}>
                        {togglePassword ? <FaEyeSlash style={{opacity:"50%"}} /> : <FaEye style={{opacity:"50%"}}/>}
                    </span>
                </div>
                    <p className={validatePassword(password) ? "small" : "offscreen"} style={{ color: 'red' }}>{validatePassword(password)}</p>
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
                    <p className={validateMatch(password , confirmation) && confirmation ? "small" : "offscreen"} style={{ color: 'red' }}>{validateMatch(password , confirmation)}</p>
                    <span className="star small"></span>
                </div>
                <center>
                    <input
                        className="btn btn-danger"
                        type="submit"
                        value="Sign Up"
                        style={{ marginTop: '10px', width: '95%' , cursor : isFormValid ? 'pointer' : 'not-allowed'}}
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
