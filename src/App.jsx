// src/App.jsx
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import Navigation from './Navigation';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const savedFirstName = localStorage.getItem('firstName');
        if (savedIsLoggedIn) {
            setIsLoggedIn(true);
            setFirstName(savedFirstName);
        }
    }, []);

    const handleLogin = (name) => {
        setFirstName(name);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('firstName', name);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setFirstName('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('firstName');
    };

    const toggleSignup = () => {
        setShowSignup(!showSignup);
    };

    return (
        <div className="App">
            {!isLoggedIn ? (
                showSignup ? (
                    <Signup toggleSignup={toggleSignup} />
                ) : (
                    <Login toggleSignup={toggleSignup} toggleLogin={handleLogin} />
                )
            ) : (
                <>
                    <Navigation handleLogout={handleLogout} />
                    {/* Add logic to show content or routing */}
                </>
            )}
        </div>
    );
}

export default App;
