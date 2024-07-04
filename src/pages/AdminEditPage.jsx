import React, { useEffect, useState } from "react";
import { AdminEditComponent } from "../components/AdminEditComponent.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { FacultyList, UpdateUser } from "../data/dataProvider.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { LoadingComponent } from "../components/LoadingComponent.jsx";

export const AdminEditPage = () => {
  const { user, logout } = useAuth();
  const [fdsList, setFdsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(useLocation().state.details);
  const navigate = useNavigate();
  const onSubmit = () => {
      console.log(details.id)
    UpdateUser({
      user,
      logout,
      userId: details.id,
      email: details.email,
      approveRight: details.approveRight,
      name: details.name,
      phone: details.phone,
      position: details.position,
      school: details.school,
      department: details.department,
      faculty: details.faculty,
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        navigate('/admin');
      });
  };

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
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <AdminEditComponent
          userData={details}
          setUserData={setDetails}
          facultyData={fdsList}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
