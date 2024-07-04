/**
 * @fileOverview Defines the CreatedPage component responsible for displaying created notesheets.
 * @module CreatedPage
 */

import React, { useEffect, useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent.jsx';
import NavbarComponent2 from '../components/NavbarComponent2.jsx';
import OutlinedCardComponent from '../components/OutlineCardComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { CreatedNotesheets, NotesheetDetails } from '../data/dataProvider';

import { IoIosAdd } from "react-icons/io";

/**
 * CreatedPage component responsible for displaying created notesheets.
 * @returns {JSX.Element} The component for displaying created notesheets.
 */
export const CreatedPage = () => {
  // Navigate function from React Router DOM
  const navigate = useNavigate();
  // State variables for managing notesheets, loading state, and authentication context
  const [notesheets, setNotesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  // Sort function to sort notesheets based on event date
  const sortUsing = (a, b) => {
    return new Date(b.eventDate) - new Date(a.eventDate);
  };

  // State and function for searching notesheets
  const [searcher, setSearcher] = useState(null);
  const searchUsing = (a) => {
    return (
      !searcher ||
      a.subject.includes(searcher) ||
      a.eventDate.includes(searcher) ||
      a.details.includes(searcher)
    );
  };

  // Fetch created notesheets and their details on component mount
  useEffect(() => {
    const notesheetdetails = [];
    CreatedNotesheets({ user, logout })
      .then((response) => response.json())
      .then((response) => {
        response?.notesheets.map(async (note) => {
          await NotesheetDetails({
            user: user,
            logout: logout,
            notesheetId: note.notesheetId,
          })
            .then((response) => response.json())
            .then((response) => {
              notesheetdetails.push(response.notesheet);
              setNotesheets([...notesheetdetails]);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "calc(83.7vh)" }}>
      {/* Render loading component if data is loading */}
      {loading ? (
        <LoadingComponent />
      ) : notesheets.length > 0 ? (
        <>
          {/* Render navbar component */}
          <NavbarComponent2 setSearch={setSearcher} />
          {/* Render notesheets as outlined cards */}
          <div
            className="flex flex-wrap gap-10 justify-start px-10"
            // className="grid-container"
            // style={{
            //   display: "flex",
            //   flexDirection: "row",
            //   flexWrap: "wrap",
            //   justifyContent: "flex-start",
            //   gap: "20px",
            //   padding: "10px",
            // }}
          >
            {notesheets
              ?.filter(searchUsing)
              .sort(sortUsing)
              .map((notesheet) => (
                <>
                  <div key={notesheet.notesheetId}>
                    <OutlinedCardComponent card={notesheet} />
                  </div>
                </>
              ))}
          </div>
        </>
      ) : (
        <div>No notesheets found</div>
      )}
      {/* Button to navigate to create a new notesheet */}
      {/* <div className="add text-[">
        <button
          style={{
            fontSize: "50px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#ff8800e5",
            color: "white",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => navigate("../create")}>
          +
        </button>
      </div> */}
      <button
        className="w-fit h-fit bg-[#ff8800e5] rounded-full p-1 absolute bottom-20 right-10"
        onClick={() => navigate("../create")}>
        <IoIosAdd color="white" size={50} />
      </button>
    </div>
  );
};
