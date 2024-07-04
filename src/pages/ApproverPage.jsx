/**
 * @fileOverview Defines the ApproverPage component responsible for managing approval workflow.
 * @module ApproverPage
 */
import React, { useEffect, useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent.jsx';
import NavbarComponent2 from '../components/NavbarComponent2.jsx';
import OutlineCardButtonComponent from '../components/OutlineCardButtonComponent.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import '../styles/ApproverPage.css';
import { RevertNotesheet, SendMessage, NewRemark, ApproveNotesheet, RejectNotesheet, UserList, ApprovalNotesheets, NotesheetDetails } from '../data/dataProvider.jsx';

/**
 * ApproverPage component responsible for managing approval workflow.
 * @returns {JSX.Element} The component for managing approval workflow.
 */
export const ApproverPage = () => {
    // Get user and logout function from authentication context
    const { user, logout } = useAuth();

    // State variables for managing notesheets, loading state, refresh flag, and user list
    const [notesheets, setNotesheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [userList, setUserList] = useState([]);

    // Sort function to sort notesheets based on event date
    const sortUsing = (a, b) => {
        return new Date(b.eventDate) - new Date(a.eventDate);
    };

    // State and function for searching notesheets
    const [searcher, setSearcher] = useState(null);
    const searchUsing = (a) => {
        return !searcher || a.subject.includes(searcher) || a.eventDate.includes(searcher) || a.details.includes(searcher);
    };

    // Function to handle reverting a notesheet
    const onRevert = (formData, toUser, nid) => {
        if (!toUser) return alert('Revert failed!');
        RevertNotesheet({ user, logout, notesheetId: nid, toUserId: toUser })
            .then(response => {
                if (response.status === 200) {
                    onRemarkSubmit(nid, formData);
                }
                return response.json();
            })
            .then(response => {
                alert(response.message);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setRefresh(true);
            });
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

    // Function to handle submitting remarks for a notesheet
    const onRemarkSubmit = (notesheetid, data) => {
        NewRemark({ user, logout, notesheetId: notesheetid, remark: data.remark })
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
    };

    // Function to handle approving a notesheet
    const onApprove = (notesheetId) => {
        ApproveNotesheet({ user, logout, notesheetId: notesheetId })
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
    };

    // Function to handle rejecting a notesheet
    const onReject = (notesheet) => {
        RejectNotesheet({ user, logout, notesheetId: notesheet.notesheetId })
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
    };

    // Function to handle forwarding a notesheet
    const onForward = (form) => {
        // console.log(form);
    };

    // Fetch user list on component mount
    useEffect(() => {
        UserList({ user, logout })
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
    }, []);

    // Fetch approval notesheets and their details on component mount and refresh
    useEffect(() => {
        const notesheetdetails = [];
        ApprovalNotesheets({ user, logout })
            .then(response => response.json())
            .then(response => {
                response?.notesheets.map(async (note) => {
                    await NotesheetDetails({ user, logout, notesheetId: note.notesheetId })
                        .then(response => response.json())
                        .then(response => {
                            notesheetdetails.push(response.notesheet);
                            setNotesheets([...notesheetdetails]);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
            })
            .then(() => {
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
        return () => {
            setRefresh(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, refresh]);

    return (
        <div className="min-height-div">
            {loading ? <LoadingComponent /> :
                (
                    <>
                        <NavbarComponent2 setSearch={setSearcher} />
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
                            {/* Render notesheets as outlined card buttons */}

                            {notesheets?.filter(searchUsing).sort(sortUsing).map((notesheet, index) => <OutlineCardButtonComponent key={notesheet.notesheetId} card={notesheet} onApprove={onApprove} onRemark={onRemarkSubmit} onPrivateRemark={onPrivateRemarkSubmit} onForward={onForward} userList={userList} onRevert={onRevert} currentUser={user} onReject={onReject} />)}

                        </div>
                    </>
                )
            }
        </div>
    );
};
