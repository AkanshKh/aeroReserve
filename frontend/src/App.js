import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signUp';
import Flight from './components/flight';
import Book from './components/book';
const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/flight" element={<Flight />} />
                    <Route path="/book" element={<Book />} />
                    {/* Add more routes as needed */}
                </Routes>
        </Router>
    );
};

export default App;
