import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import '../App.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        // If successful, redirect to another page:
        // history.push('/dashboard');
    };

    return (
        <div className="user-box">
            <div>
                <center>
                    <img src="/logo.png" alt="Logo" height="35em" style={{ marginBottom: '2vh', borderRadius:"1rem"}} />
                    <h3>Log in to Flight</h3><br/>
                </center>
            </div>
            <form onSubmit={handleSubmit} id="signin-form" style={{ width: '100%', marginBottom: '5vh' }}>
                <div className="form-group">
                    <input
                        className="form-control inp usrnm"
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoComplete="off"
                        // autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control inp pswd"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="star"><small>{message}</small></span>
                </div>
                <center>
                    <input
                        className="btn btn-danger"
                        type="submit"
                        value="Log in"
                        style={{ marginTop: '10px', width: '95%' }}
                        disabled={!username || !password}
                    />
                </center>
            </form>
            <div>
                <center>
                    Don't have an account?&nbsp;&nbsp;<Link to="/signup">Sign Up</Link>
                </center>
            </div>
        </div>
    );
};

export default Login;
