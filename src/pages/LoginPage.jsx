/**
 * @fileOverview Defines the LoginPage component responsible for rendering the login page layout.
 * @module LoginPage
 */

import React, { useState } from 'react';
import LoginComponent from '../components/LoginComponent.jsx';
import { useAuth } from '../hooks/useAuth';
import { AdminLogin, Login } from '../data/dataProvider.jsx';

/**
 * LoginPage component responsible for rendering the login page layout.
 * @returns {JSX.Element} The component for rendering the login page layout.
 */
export const LoginPage = () => {
    // State variables for username, password, and admin status
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    // Authentication context
    const { login, adminLogin } = useAuth();

    // Function to handle username change
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    // Function to handle password change
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle admin checkbox change
    const handleAdminChange = (event) => {
        setIsAdmin(event.target.checked);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Form data
        const formData = {
            email: username,
            password: password,
            admin: isAdmin
        };

        try {
            // Login request
            if (formData.admin) {
                const response = await AdminLogin(formData);

                if (response.ok) {
                    // Successful login
                    const responseData = await response.json();
                    await adminLogin({ ...responseData });
                } else {
                    // Failed login
                    console.error('Login failed');
                    alert('Invalid credentials. Please try again.');
                }
            } else {
                const response = await Login(formData);

                if (response.ok) {
                    // Successful login
                    const responseData = await response.json();
                    await login({ ...responseData });
                } else {
                    // Failed login
                    console.error('Login failed');
                    alert('Invalid credentials. Please try again.');
                }
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
                handleAdminChange={handleAdminChange}
                username={username}
                password={password}
                isAdmin={isAdmin}
            />
        </div>
    );
};
