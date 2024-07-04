/**
 * @fileOverview Defines the CreatedPage component responsible for displaying created notesheets.
 * @module CreatedPage
 */

import React, { useEffect, useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent.jsx';
import NavbarComponent2 from '../components/NavbarComponent2.jsx';
import OutlineCardComponent from '../components/OutlineCardComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { AllNotesheets, CreatedNotesheets, NotesheetDetails } from '../data/dataProvider';

/**
 * CreatedPage component responsible for displaying created notesheets.
 * @returns {JSX.Element} The component for displaying created notesheets.
 */
export const AdminNotesheetPage = () => {
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
    return !searcher || a.subject.includes(searcher) || a.eventDate.includes(searcher) || a.details.includes(searcher);
  };

  // Fetch created notesheets and their details on component mount
  useEffect(() => {
    const notesheetdetails = [];
    AllNotesheets({ user, logout })
      .then((response) => response.json())
      .then((response) => {
        response?.notesheets.map(async (note) => {
          await NotesheetDetails({ user: user, logout: logout, notesheetId: note.id })
            .then((response) => response.json())
            .then((response) => {
              notesheetdetails.push(response.notesheet);
              setNotesheets([...notesheetdetails]);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: 'calc(83.7vh)' }}>
      {/* Render loading component if data is loading */}
      {loading ? (
        <LoadingComponent />
      ) : notesheets.length > 0 ? (
        <>
          {/* Render navbar component */}
          <NavbarComponent2 setSearch={setSearcher} />
          {/* Render notesheets as outlined cards */}
          <div
            className="grid-container"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: '10px',
              padding: '10px',
            }}
          >
            {notesheets?.filter(searchUsing).sort(sortUsing).map((notesheet) => (
              <OutlineCardComponent card={notesheet} sortUsing={sortUsing} />
            ))}
          </div>
        </>
      ) : (
        <div>No notesheets found</div>
      )}
    </div>
  );
};
