/**
 * @fileOverview Defines the NotesheetCreatePage component responsible for creating a new notesheet.
 * @module NotesheetCreatePage
 */

import { useEffect, useState } from "react";
import { CreateNotesheetComponent } from "../components/CreateNotesheetComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CreateNotesheet, UserList, ApproverList, FacultyList } from "../data/dataProvider";
import { LoadingComponent } from "../components/LoadingComponent";

/**
 * NotesheetCreatePage component responsible for creating a new notesheet.
 * @returns {JSX.Element} The component for creating a new notesheet.
 */

export const NotesheetCreatePage = () => {
  // Navigate function from React Router DOM
  const navigate = useNavigate();
  // Authentication context
  // eslint-disable-next-line no-unused-vars
  const {user,logout} = useAuth();

  const [fdsList, setFdsList] = useState([]);

  // State variables for available and selected approvers, proposers, and form data
  const [availableApprovers, setAvailableApprovers] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  // TODO: const [availableDepartments, setAvailableDepartments] = useState([]);
  // TODO: const [availableSchools, setAvailableSchools] = useState([]);
  const [availableProposers, setAvailableProposers] = useState([]);
  const [selectedProposers, setSelectedProposers] = useState([]);


  // Fetch available approvers and proposers on component mount
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch proposers
    UserList({ user, logout })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Response from server:", data);
        setAvailableProposers(data.users);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
    // Fetch approvers
    ApproverList({ user, logout })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        let approvers = data.approvers.filter(
          (approver) => approver.id !== user.userId
        );
        setAvailableApprovers(approvers);
        console.log("Approvers:", availableApprovers);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
      FacultyList({user,logout},)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// Function to handle form submission
  const [formData, setFormData] = useState({
    eventDate: "",
    school: "",
    days: 1,
    department: "",
    subject: "",
    details: "",
    objective: "",
    finance: null,
  });

  // console.log('form',formData)
  const handleSubmit = () => {

    // Extract approver and proposer IDs
    let approvers = selectedApprovers.map((approver) => approver.id);
    let proposers = selectedProposers.map(
      (proposer) =>
        proposer.name + " (" + proposer.position + ")\n" + proposer.department
    );
    // approvers = [user.userId, ...approvers];
    console.log("check", formData);

    // Create notesheet
    CreateNotesheet({
      user,
      logout,
      eventDate: formData.eventDate,
      school: formData.school,
      department: formData.department,
      subject: formData.subject,
      details: formData.details,
      objectives: formData.objective,
      proposers: proposers,
      faculty: formData.faculty,
      teachers: approvers,
      days: formData.days,
      finance: formData.finance,
    })
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (response.status == 201) {
          alert("Creation successful");
          navigate("/home/created");
        } else {
          alert("Creation failed, please try again!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
    {
      loading? <LoadingComponent /> :
      <CreateNotesheetComponent
      // Department={Department}
      // School={School}
      // Faculty={Faculty}
      formData={formData}
      setFormData={setFormData}
      availableApprovers={availableApprovers}
      availableProposers={availableProposers}
      setSelectedApprovers={setSelectedApprovers}
      setSelectedProposers={setSelectedProposers}
      handleSubmit={handleSubmit}
      facultyData = {fdsList} 
    />
    }
    </>
  );
};
