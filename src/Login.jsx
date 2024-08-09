import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import L from './assets/Login.png';

function Login({ toggleSignup, toggleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: false, password: false, emailInvalid: false, loginError: false });

    const handleLogin = () => {
        const isEmailValid = email.endsWith('@gmail.com');
        if (email === '' || password === '' || !isEmailValid) {
            setError({
                email: email === '',
                password: password === '',
                emailInvalid: email !== '' && !isEmailValid,
                loginError: false,
            });
        } else {
            axios.post('http://localhost:3001/login', {
                email,
                password,
            })
            .then(response => {
                const firstName = response.data.firstName;
                toggleLogin(firstName);
            })
            .catch(error => {
                setError({
                    email: false,
                    password: false,
                    emailInvalid: false,
                    loginError: true,
                });
                console.error('There was an error!', error);
            });
        }
    };

    return (
        <div className="login-container">
            <img src={L} alt="App Logo" style={{ width: '10rem' }} />
            <h2>Welcome Back</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error.email || error.emailInvalid || error.loginError ? 'input-error' : ''}
            />
            {error.email && <span className="error-message">Please enter your email</span>}
            {error.emailInvalid && <span className="error-message">Please enter a valid email ending with @gmail.com</span>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error.password || error.loginError ? 'input-error' : ''}
            />
            {error.password && <span className="error-message">Please enter your password</span>}
            {error.loginError && <span className="error-message">Invalid email or password</span>}
            <button onClick={handleLogin}>Login</button>
            <a href="#" className="forgot-password">Forgot Password?</a>
            <div className="sign-up">
                Don't have an account? <a href="#" onClick={toggleSignup}>Sign Up</a>
            </div>
        </div>
    );
}

export default Login;
