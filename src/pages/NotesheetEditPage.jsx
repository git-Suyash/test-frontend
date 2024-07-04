/**
 * @fileOverview Defines the NotesheetEditPage component responsible for editing a notesheet.
 * @module NotesheetEditPage
 */

import React, { useEffect, useState } from 'react';
import EditNotesheetComponent from '../components/EditNotesheetComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserList, ApproverList, UpdateNotesheet, FacultyList } from '../data/dataProvider';
import { LoadingComponent } from '../components/LoadingComponent';

/**
 * NotesheetEditPage component responsible for editing a notesheet.
 * @returns {JSX.Element} The component for editing a notesheet.
 */
export const NotesheetEditPage = () => {
  // Navigate function from React Router DOM
  const navigate = useNavigate();
  // Notesheet details from location state
  const notesheet = useLocation().state.notesheet;
  // Authentication context
  const { user, logout } = useAuth();

  // Faculty data
  const facultyData = {
    faculty: {
      "Faculty of Engineering": {
        "School Of Computer Science & Engineering": [
          "Department of Computer Science & Engineering",
          "Department of Artificial Intelligence & Machine Learning",
        ],
        "School Of Computing & Intelligent Systems": [
          "Department of Computer & Communication Engineering",
          "Department of IoT & Intelligent Systems",
        ],
        "School of Information, Security and Data Science": [
          "Department of Information Technology",
          "Department of Data Science & Engineering",
        ],
        "School of Automobile, Mechanical and Mechatronics": [
          "Department of Mechanical Engineering",
          "Department of Mechatronics Engineering",
        ],
        "School of Electrical, Electronics & Communication Engineering": [
          "Department of Electrical Engineering",
          "Department of Electronics & Communication Engineering",
        ],
        "School of Civil, Biotechnology and Chemical Engineering": [
          "Department of Civil Engineering",
          "Department of Biotechnology and Chemical Engineering",
        ],
      },
      "Faculty of Design": {
        "School of Design & Art": [
          "Department of Fine Arts",
          "Department of Fashion Design",
          "Department of Interior Design",
          "Department of Interaction and Communication Design (ICD)",
        ],
        "School of Architecture & Design": ["Department of Architecture"],
      },
    },
  };

  const [fdsList, setFdsList] = useState([]);

  // State variables for available approvers, selected approvers, available proposers, selected proposers, and form data
  const [availableApprovers, setAvailableApprovers] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState(notesheet.users.filter((user) => user.userRank !== 0));
  const [availableProposers, setAvailableProposers] = useState([]);
  const [selectedProposers, setSelectedProposers] = useState(notesheet.proposers);
  const [formData, setFormData] = useState({
    date: notesheet.eventDate,
    school: notesheet.school,
    days: 1,
    faculty: notesheet.faculty,
    department: notesheet.department,
    subject: notesheet.subject,
    details: notesheet.details,
    objective: notesheet.objectives,
    amount: null,
    finance: notesheet.finance,
  });

  // Fetch available users and approvers on component mount
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    UserList({ user, logout })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAvailableProposers(data.users.map((option) => option.name + " (" + option.position + ")\n" + option.department));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error.message);
      });

    ApproverList({ user, logout })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let approvers = data.approvers.filter((approver) => approver.id !== user.userId);
        setAvailableApprovers(approvers.map((approver) => ({ userId: approver.id, userName: approver.name, userPosition:approver.position, userDepartment: approver.department })));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error.message);
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

  // Function to handle notesheet update
  const handleUpdate = () => {
    let approvers = selectedApprovers?.filter((approver) => approver !== null)?.map((approver) => approver?.userId);
    let proposers = selectedProposers?.filter((proposer) => proposer !== null);
    console.log(formData)
    UpdateNotesheet({
      user,
      logout,
      notesheetId: notesheet.notesheetId,
      eventDate: formData.date,
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
        if (response.ok) {
          alert("Update successful");
          navigate("/home/created");
        } else {
          alert("Update failed, please try again!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {/* Render EditNotesheetComponent with relevant props */}
      {loading? <LoadingComponent />: <EditNotesheetComponent
        facultyData={fdsList}
        formData={formData}
        setFormData={setFormData}
        availableApprovers={availableApprovers}
        availableProposers={availableProposers}
        setSelectedApprovers={setSelectedApprovers}
        setSelectedProposers={setSelectedProposers}
        initialProposers={selectedProposers}
        initialApprovers={selectedApprovers}
        handleSubmit={handleUpdate}
      />}
    </>
  );
};
