import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signUp';
import Flight from './components/flight';
import Book from './components/book';
import Payment from './components/payment';
import Exit from './components/exit';
import Bookings from './components/bookings';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './context/protectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={
                            <PrivateRoute>
                                <Login />
                            </PrivateRoute>
                        } />
                        <Route path="/signup" element={<SignUp />} />
                        <Route 
                            path="/flight"
                            element={
                                <PrivateRoute>
                                    <Flight />
                                </PrivateRoute>
                            }
                        />
                        <Route 
                            path="/payment"
                            element={
                                <PrivateRoute>
                                    <Payment />
                                </PrivateRoute>
                            }
                        />
                        <Route 
                            path="/book"
                            element={
                                <PrivateRoute>
                                    <Book />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/exit" element={
                            <PrivateRoute>
                                <Exit />
                            </PrivateRoute>
                        
                        } />
                        <Route 
                            path="/bookings"
                            element={
                                <PrivateRoute>
                                    <Bookings />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
