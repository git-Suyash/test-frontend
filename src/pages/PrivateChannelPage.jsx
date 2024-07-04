// import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import {  NotesheetDetails, ViewerNotesheets } from "../data/dataProvider";
import OutlineCardComponent from "../components/OutlineCardComponent";
import NavbarComponent2 from "../components/NavbarComponent2";
import { LoadingComponent } from "../components/LoadingComponent";

export const PrivateChannelPage = () => {
  // const navigate = useNavigate();
  const [notesheets, setNotesheets] = useState([]);
  // const [notesheetsDetails, setNotesheetsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    ViewerNotesheets({user,logout},)
      .then((response) => response.json())
      .then((response) => {
        setNotesheets(response.notesheets);
        return response.notesheets;
      })
      .then(async (data) => {
        // console.log("HEllo")
        let notesheetsDetails = [];
        data?.map(async (note) => {
          await NotesheetDetails({user,logout,notesheetId:note.notesheetId})
              .then(response => response.json())
              .then(response => {
                // console.log(response.notesheet)
                notesheetsDetails.push(
                      response.notesheet,
                  );
                  setNotesheets([...notesheetsDetails]);
              })
              .catch(error => {
                  console.error('Error:', error);
              })
      })
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(notesheets);
  return (
    <div style={{ minHeight: "calc(83.7vh)" }}>
      {loading ? (
        <LoadingComponent />
      ) : notesheets.length > 0 ? (
        <>
          <NavbarComponent2 />
          <div
            className="grid-container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: "10px",
              padding: "10px",
            }}
          >
            {notesheets?.map((notesheet) => (
              <OutlineCardComponent card={notesheet} viewer={true}/>
            ))}
          </div>
        </>
      ) : (
        <div>No notesheets found</div>
      )}
    </div>
  );
};