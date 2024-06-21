import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token){
      const username = localStorage.getItem('username');
      setUser({username, token});
      setLoading(false);
    }
    else{
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
  }

  const logout = () => {
    console.log('Logging out');
    setUser(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{user,loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}