/**
 * @fileOverview Defines the AdminPage component responsible for managing user data in the admin interface.
 * @module AdminPage
 */

import React, { useEffect, useState } from "react";
import { AdminNavbarComponent } from "../components/AdminNavbarComponent.jsx";
import { AdminComponent } from "../components/AdminComponent.jsx";
import {  AdminUserList } from "../data/dataProvider.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { LoadingComponent } from "../components/LoadingComponent.jsx";
import { ActivateUser } from "../data/dataProvider";
import { useNavigate, useOutlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";

/**
 * AdminPage component responsible for managing user data in the admin interface.
 * @returns {JSX.Element} The component for managing user data in the admin interface.
 */



export const AdminPage = () => {
  // Get user and logout function from authentication context
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const outlet = useOutlet();
  const navigate = useNavigate();

  const settings = [
    {
        title: 'Logout',
        route: '/logout',
        onClick: () => logout()
    }
];

const pages = [
  {
    title: 'Users',
    route: '/admin',
    onClick: () => navigate('/admin')
},
  {
      title: 'Notesheets',
      route: '/admin/notesheets',
      onClick: () => navigate('notesheets')
  },
  
  // {
  //     title: 'Create Notesheet',
  //     route: '/home/create',
  //     onClick: () => {navigate('create')}
  // },
]

  function handleActivate() {
    selected.forEach((item) => {
      ActivateUser({ user: user,logout: logout, userId: item.id, active: true })
        .then(response => response.json())
        .then(response => {alert(response.message);})
        .catch(error => {console.error('Error:', error);})
    });
  }
  function handleDeActivate() {
    selected.forEach((item) => {
      ActivateUser({ user: user,logout: logout, userId: item.id, active: false })
        .then(response => response.json())
        .then(response => {alert(response.message);})
        .catch(error => {console.error('Error:', error);})
    });
  }

  useEffect(() => {
    AdminUserList({ user, logout })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserList(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading,refresh]);

  // State for managing whether add or edit mode is selected
  const [isUpdateSelected, setIsUpdateSelected] = useState(false);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          {/* Render Admin navigation component */}
          <NavbarComponent 
                user={user}
                logout={logout}
                settings={settings}
                pages={pages}
            />
          { outlet || <AdminComponent userList={userList} handleActivate={handleActivate} handleDeActivate={handleDeActivate} selected={selected} setSelected={setSelected} />}
          {/* Conditional rendering of Add or Edit component based on selection */}
          {/* {isUpdateSelected ? (
      <AdminEditComponent userData={userData} setUserData={setUserData} />
    ) : (
      <AdminAddComponent
      userData={userData}
      setUserData={setUserData}
      handleSubmit={handleUpdate}
      />
    )} */}
        </div>
      )}
    </>
  );
};
