import {
  changepasswordUrl,
  loginUrl,
  userdetailsUrl,
  notficationUrl,
  notesheetsapprovalUrl,
  creatednotesheetsUrl,
  usersUrl,
  createnotesheetUrl,
  updatenotesheetUrl,
  notesheetdetailUrl,
  approveUrl,
  newremarkUrl,
  revertUrl,
  approversUrl,
  addnewuserUrl,
  rejectUrl,
  facultylistUrl,
  allnotesheetsUrl,
  updateuserUrl,
  activateuserUrl,
  statsUrl,
  sendmessageUrl,
  privateremarksUrl,
  viewernotesheetsUrl,
  adminloginurl,
  adminUsersUrl,
} from "./urls";

const tokenWrapper = (request, logout) => {
  return request.then((response) => {
    if (response.status === 401) {
      logout();
    }
    return response;
  });
};

export function Login({ email, password }) {
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export function AdminLogin({ email, password }) {
  return fetch(adminloginurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export function AllNotesheets({ user, logout }) {
  return tokenWrapper(
    fetch(allnotesheetsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function AddNewUser({
  user,
  logout,
  email,
  approveRight,
  name,
  phone,
  position,
  school,
  department,
  faculty,
}) {
  return tokenWrapper(
    fetch(addnewuserUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        email: email,
        approveRight: approveRight,
        name: name,
        phone: phone,
        position: position,
        school: school,
        department: department,
        faculty: faculty,
      }),
    }),
    logout
  );
}

export function UpdateUser({
  user,
  logout,
  userId,
  email,
  approveRight,
  name,
  phone,
  position,
  school,
  department,
  faculty,
}) {
  return tokenWrapper(
    fetch(updateuserUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        userId: userId,
        email: email,
        approveRight: approveRight,
        name: name,
        phone: phone,
        position: position,
        school: school,
        department: department,
        faculty: faculty,
      }),
    }),
    logout
  );
}

export function ActivateUser({ user, logout, userId, active }) {
  return tokenWrapper(
    fetch(activateuserUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        userId: userId,
        active: active,
      }),
    }),
    logout
  );
}

export function Stats({ user, logout }) {
  return tokenWrapper(
    fetch(statsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function ChangePassword({ user, logout, currentPassword, newPassword }) {
  return tokenWrapper(
    fetch(changepasswordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    }),
    logout
  );
}

export function UserDetails({ user, logout }) {
  return tokenWrapper(
    fetch(userdetailsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function UserNotifications({ user, logout }) {
  return tokenWrapper(
    fetch(notficationUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function ApprovalNotesheets({ user, logout }) {
  return tokenWrapper(
    fetch(notesheetsapprovalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function CreatedNotesheets({ user, logout }) {
  return tokenWrapper(
    fetch(creatednotesheetsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function ViewerNotesheets({ user, logout }) {
  return tokenWrapper(
    fetch(viewernotesheetsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function UserList({ user, logout }) {
  return tokenWrapper(
    fetch(usersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function ApproverList({ user, logout }) {
  return tokenWrapper(
    fetch(approversUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function FacultyList({ user, logout }) {
  return tokenWrapper(
    fetch(facultylistUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}

export function PositionsList({ user, logout }) {
  return tokenWrapper(
    fetch(facultylistUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    logout
  );
}

export function CreateNotesheet({
  user,
  logout,
  eventDate,
  school,
  department,
  subject,
  details,
  objectives,
  proposers,
  faculty,
  teachers,
  days,
  finance,
}) {
  return tokenWrapper(
    fetch(createnotesheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        eventDate: eventDate,
        school: school,
        department: department,
        subject: subject,
        details: details,
        objectives: objectives,
        proposers: proposers,
        faculty: faculty,
        teachers: teachers,
        days: days,
        finance: finance,
      }),
    }),
    logout
  );
}

export function UpdateNotesheet({
  user,
  logout,
  notesheetId,
  eventDate,
  school,
  department,
  subject,
  details,
  objectives,
  proposers,
  faculty,
  teachers,
  days,
  finance,
}) {
  return tokenWrapper(
    fetch(updatenotesheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
        eventDate: eventDate,
        school: school,
        department: department,
        subject: subject,
        details: details,
        objectives: objectives,
        proposers: proposers,
        faculty: faculty,
        teachers: teachers,
        days: days,
        finance: finance,
      }),
    }),
    logout
  );
}

export function NotesheetDetails({ user, logout, notesheetId }) {
  return tokenWrapper(
    fetch(notesheetdetailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
      }),
    }),
    logout
  );
}

export function ApproveNotesheet({ user, logout, notesheetId }) {
  return tokenWrapper(
    fetch(approveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
      }),
    }),
    logout
  );
}

export function NewRemark({ user, logout, notesheetId, remark }) {
  return tokenWrapper(
    fetch(newremarkUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
        remark: remark,
      }),
    }),
    logout
  );
}

export function RevertNotesheet({ user, logout, notesheetId, toUserId }) {
  return tokenWrapper(
    fetch(revertUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
        toUserId: toUserId,
      }),
    }),
    logout
  );
}

export function RejectNotesheet({ user, logout, notesheetId }) {
  return tokenWrapper(
    fetch(rejectUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
      }),
    })
  );
}

export function SendMessage({
  user,
  logout,
  receiverId,
  message,
  notesheetId,
}) {
  return tokenWrapper(
    fetch(sendmessageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        receiverId: receiverId,
        message: message,
        notesheetId: notesheetId,
      }),
    }),
    logout
  );
}

export function PrivateRemarks({ user, logout, notesheetId }) {
  return tokenWrapper(
    fetch(privateremarksUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        notesheetId: notesheetId,
      }),
    }),
    logout
  );
}

export function AdminUserList({ user, logout }) {
  return tokenWrapper(
    fetch(adminUsersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }),
    logout
  );
}
