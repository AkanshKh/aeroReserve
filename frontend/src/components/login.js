import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import '../App.css';
import { AuthContext } from '../context/authContext';

const Login = () => {

    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const history = useHistory();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8000/api/login/';

        try{
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if(response.status === 200){
                const data = await response.json();
                login(data);
                navigate('/');
            }
            else if(response.status === 400){
                setMessage('Invalid credentials');
            }
        }
        catch(error){
            console.log('Error:', error);
        }
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
