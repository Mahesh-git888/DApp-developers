import React, { useState } from 'react';
import './Signup.css';
import S from './assets/signup.png';
import axios from 'axios';

function Signup({ toggleSignup }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        emailInvalid: false,
        password: false,
    });

    const handleRegister = () => {
        const isEmailValid = email.endsWith('@gmail.com');
        if (
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            password === '' ||
            !isEmailValid
        ) {
            setError({
                firstName: firstName === '',
                lastName: lastName === '',
                email: email === '',
                emailInvalid: email !== '' && !isEmailValid,
                password: password === '',
            });
        } else {
            axios.post('http://localhost:3001/signup', {
                firstName,
                lastName,
                email,
                password,
            })
            .then(response => {
                toggleSignup();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
    };

    return (
        <div className="signup-container">
            <img style={{ width: "10rem" }} src={S} alt="Signup Logo" />
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={error.firstName ? 'input-error' : ''}
            />
            {error.firstName && <span className="error-message">Please enter your first name</span>}
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={error.lastName ? 'input-error' : ''}
            />
            {error.lastName && <span className="error-message">Please enter your last name</span>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error.email || error.emailInvalid ? 'input-error' : ''}
            />
            {error.email && <span className="error-message">Please enter your email</span>}
            {error.emailInvalid && <span className="error-message">Please enter a valid email ending with @gmail.com</span>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error.password ? 'input-error' : ''}
            />
            {error.password && <span className="error-message">Please enter your password</span>}
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Signup;
