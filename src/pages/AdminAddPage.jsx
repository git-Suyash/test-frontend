import React, { useEffect } from "react";
import { AdminAddComponent } from "../components/AdminAddComponent.jsx";
import { useState } from "react";
import { AddNewUser, FacultyList } from "../data/dataProvider.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from 'react-router-dom';
import { LoadingComponent } from "../components/LoadingComponent.jsx";

export const AdminAddPage = () => {
  const { user, logout } = useAuth();
  const [fdsList, setFdsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for storing user data
  const [userData, setUserData] = useState({
    email: "",
    approveRight: false,
    name: "",
    phone: "",
    position: "",
    school: "",
    department: "",
    faculty: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    FacultyList({ user, logout })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFdsList(data.faculty);
        setLoading(false);
      });
  }, []);

  // Function to handle updating user data
  const handleUpdate = () => {
    AddNewUser({
      user,
      logout,
      email: userData.email,
      approveRight: userData.approveRight,
      name: userData.name,
      phone: userData.phone,
      position: userData.position,
      school: userData.school,
      department: userData.department,
      faculty: userData.faculty,
    })
      .then((response) => {
        if (response.ok) {
          alert("New User Added successfully");
        } else {
          alert("Update failed, please try again!");
        }
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <AdminAddComponent facultyData={fdsList} userData={userData} setUserData={setUserData} handleSubmit={handleUpdate}/>
      )}
    </>
  );
};
