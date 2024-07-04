/**
 * @fileOverview Defines the NotesheetDetailPage component responsible for displaying the details of a notesheet.
 * @module NotesheetDetailPage
 */

import React, { useEffect, useState } from 'react';
import NotesheetDetailComponent from "../components/NotesheetDetailComponent";
import { useAuth } from "../hooks/useAuth";
import { ApproveNotesheet, NewRemark, RevertNotesheet, NotesheetDetails, SendMessage, UserList, PrivateRemarks, } from "../data/dataProvider";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * NotesheetDetailPage component responsible for displaying the details of a notesheet.
 * @returns {JSX.Element} The component for displaying the details of a notesheet.
 */
export const NotesheetDetailPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notesheet, setNotesheet] = useState(useLocation().state.notesheet);
  // eslint-disable-next-line no-unused-vars
  const [viewer, setViewer] = useState(useLocation().state.viewer);
  const [privateRemark, setPrivateRemark] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [userList, setUserList] = useState([]);

  const onRevert = (formData, toUser, nid) => {
    // console.log(formData);
    // console.log(nid);
    // console.log(toUser);
    if (!toUser) return alert("Revert failed!");
    RevertNotesheet({ user, logout, notesheetId: nid, toUserId: toUser })
      .then((response) => {
        if (response.status === 200) {
          onRemarkSubmit(nid, formData);
        }
        return response.json();
      })
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setRefresh(true);
      });
  };

  const onRemarkSubmit = (notesheetid, data) => {
    NewRemark({ user, logout, notesheetId: notesheetid, remark: data.remark })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setRefresh(true);
      });
  };
  const onApprove = (notesheetId) => {
    ApproveNotesheet({ user, logout, notesheetId: notesheetId })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setRefresh(true);
      });
  };

  const onEdit = (notesheetId) => {
    navigate("/home/edit", { state: { notesheet: notesheet } });
  };

  const onPrivateRemarkSubmit = (formData, toUser, nid) => {
    if (!toUser) return alert('Revert failed!');
    console.log("API")
    console.log(formData, toUser, nid)
    SendMessage({ user, logout, notesheetId: nid, message: formData, receiverId: toUser })
      .then(response => response.json())
      .then(response => {
        alert(response.message);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setRefresh(true);
      });
  }

  useEffect(() => {
    if (!refresh) return;
    PrivateRemarks({ user, logout, notesheetId: notesheet.notesheetId })
      .then((response) => response.json())
      .then((response) => {
        setPrivateRemark(response.privateRemarks);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setRefresh(false);
      });
    NotesheetDetails({ user, logout, notesheetId: notesheet.notesheetId })
      .then((response) => response.json())
      .then((response) => {
        setNotesheet(response.notesheet);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setRefresh(false);
      });
      UserList({user, logout})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserList(data.users);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesheet.notesheetId, refresh]);

  return (
    <div className="min-height-div">
      <NotesheetDetailComponent
        onApprove={onApprove}
        onRemarkSubmit={onRemarkSubmit}
        onRevert={onRevert}
        onEdit={onEdit}
        notesheet={notesheet}
        privateRemark={privateRemark}
        viewer={viewer}
        onPrivateRemark={onPrivateRemarkSubmit}
        userList={userList}
      />
    </div>
  );
};
