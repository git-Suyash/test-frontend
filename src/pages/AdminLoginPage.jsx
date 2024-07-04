/**
 * @fileOverview Defines the LoginPage component responsible for rendering the login page layout.
 * @module LoginPage
 */

import React, { useState } from 'react';
import LoginComponent from '../components/LoginComponent.jsx';
import { useAuth } from '../hooks/useAuth';
import { AdminLogin } from '../data/dataProvider.jsx';

/**
 * LoginPage component responsible for rendering the login page layout.
 * @returns {JSX.Element} The component for rendering the login page layout.
 */
export const AdminLoginPage = () => {
    // State variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Authentication context
    const { login } = useAuth();

    // Function to handle username change
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    // Function to handle password change
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Form data
        const formData = {
            email: username,
            password: password
        };

        try {
            // Login request
            const response = await AdminLogin(formData);
        
            if (response.ok) {
                // Successful login
                const responseData = await response.json();
                await login({...responseData});
            } else {
                // Failed login
                console.error('Login failed');
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-height-div">
            {/* Render LoginComponent with form handlers and state */}
            <LoginComponent 
                handleSubmit={handleSubmit} 
                handlePasswordChange={handlePasswordChange} 
                handleUsernameChange={handleUsernameChange} 
                username={username} 
                password={password}
            />
        </div>
    );
};
