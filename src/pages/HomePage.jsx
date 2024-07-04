/**
 * @fileOverview Defines the HomePage component responsible for rendering the home page layout.
 * @module HomePage
 */

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import { useAuth } from '../hooks/useAuth';
import { BottomBarComponent } from '../components/BottomBarComponent';
import { UserDetails } from '../data/dataProvider';

/**
 * HomePage component responsible for rendering the home page layout.
 * @returns {JSX.Element} The component for rendering the home page layout.
 */
export const HomePage = () => {
  // Navigate function from React Router DOM
  const navigate = useNavigate();
  // Authentication context
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState();

  // Pages for approvers
  const approverPages = [
    {
      title: "For Approval",
      route: "/home/approval",
      onClick: () => navigate("approval"),
    },
  ];

  const adminPages = [
    {
      title: "Insights",
      route: "/insight",
      onClick: () => {
        navigate("/insight");
      },
    },
  ];

  // Pages for all users
  const pages = [
    {
      title: "My Notesheets",
      route: "/home/created",
      onClick: () => navigate("created"),
    },
    // {
    //     title: 'Create Notesheet',
    //     route: '/home/create',
    //     onClick: () => {navigate('create')}
    // },
    {
      title: "Private Channel",
      route: "/home/private-channel",
      onClick: () => {
        navigate("private-channel");
      },
    },
  ];
  // Settings options
  const settings = [
    {
      title: "Profile",
      route: "/profile",
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      route: "/logout",
      onClick: () => logout(),
    },
  ];

  useEffect(() => {
    UserDetails({ user, logout })
      .then((response) => response.json())
      .then((data) => {
        const userDetails = data.user;
        setUserDetails(userDetails);
      })
      .catch((error) => console.error("Error:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userId]);

  return (
    <div className="min-height-div">
      {/* Render NavbarComponent with pages and settings */}
      <NavbarComponent
        pages={[
          ...pages,
          ...(user.approveRight ? approverPages : []),
          ...(user.insightsView ? adminPages : []),
        ]}
        settings={settings}
        user={user}
        userDetails={userDetails}
        logout={logout}
      />
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};
