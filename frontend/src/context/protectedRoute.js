// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user, loading);
    if(loading){
        return <div>Loading...</div>
    }
    return (
      user === null ? <Navigate to="/login" /> : children
    )
};

export default PrivateRoute;
