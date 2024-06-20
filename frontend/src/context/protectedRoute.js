// PrivateRoute.js
import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user, loading);
    const location = useLocation();
    useEffect(() => {
        // console.log('User:', user);
    }, [loading]);
    if(loading){
        return <div>Loading...</div>
    }
    if(location.pathname === '/login' && user != null){
      // console.log('Redirecting to home');
        return <Navigate to="/home" />
    }
    return (
      user === null ? <Navigate to="/login" /> : children
    )
};

export default PrivateRoute;
