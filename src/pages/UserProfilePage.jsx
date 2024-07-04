/**
 * @fileOverview Defines the UserProfilePage component responsible for displaying user profile details.
 * @module UserProfilePage
 */

import React, { useEffect, useState } from 'react';
import defaultProfileImage from '../images/user.png';
// import '../styles/styles.css';
import UserProfileComponent from '../components/UserProfileComponent.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { UserDetails } from '../data/dataProvider.jsx';

/**
 * UserProfilePage component responsible for displaying user profile details.
 * @returns {JSX.Element} The component for displaying user profile.
 */
const UserProfilePage = () => {
    // Authentication context
    const { user, logout } = useAuth();
    // State variable for user data
    const [userData, setUserData] = useState({
        name: '',
        position: '',
        faculty: '',
        school: '',
        department: '',
        phone: '',
        email: '',
        profileImage: defaultProfileImage
    });

    // Fetch user details on component mount
    useEffect(() => {
        UserDetails({ user, logout })
            .then(response => response.json())
            .then(data => {
                const userDetails = data.user;
                setUserData({
                    name: userDetails.name,
                    position: userDetails.position,
                    faculty: userDetails.faculty,
                    school: userDetails.school,
                    department: userDetails.department,
                    phone: userDetails.phone,
                    email: userDetails.email,
                    profileImage: defaultProfileImage
                });
            })
            .catch(error => console.error('Error:', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.userId]);

    return (
        <div className="min-height-div">
            {/* Render UserProfileComponent with user data and logout function */}
            <UserProfileComponent userData={userData} logout={logout} />
        </div>
    );
}

export default UserProfilePage;
