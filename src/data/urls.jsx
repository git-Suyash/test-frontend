// file contains all api urls


const baseUrl = import.meta.env.VITE_APP_BASE_URL;
// authentication routes
export const loginUrl = baseUrl + "/login";

// admin routes
export const adminloginurl = baseUrl + "/admin/login";
export const adminUsersUrl = baseUrl + "/admin/users";
export const allnotesheetsUrl = baseUrl + "/all-notesheets";
export const addnewuserUrl = baseUrl + "/add-new-user";
export const updateuserUrl = baseUrl + "/update-user";
export const activateuserUrl = baseUrl + "/activate-user";

// insights routes
export const statsUrl = baseUrl + "/stats";

// user routes
export const changepasswordUrl = baseUrl + "/change-password";
export const userdetailsUrl = baseUrl + "/user-details";
export const notficationUrl = baseUrl + "/user-notifications";
export const notesheetsapprovalUrl = baseUrl + "/notesheets-for-approval";
export const creatednotesheetsUrl = baseUrl + "/my-notesheets";
export const viewernotesheetsUrl = baseUrl + "/viewer-notesheets";
export const usersUrl = baseUrl + "/users";
export const approversUrl = baseUrl + "/approvers";
export const facultylistUrl = baseUrl + "/faculty-list";
export const positionlistUrl = baseUrl + "/position-list";
export const createnotesheetUrl = baseUrl + "/new-notesheet";
export const updatenotesheetUrl = baseUrl + "/update-notesheet";
export const notesheetdetailUrl = baseUrl + "/notesheet-details";
export const approveUrl = baseUrl + "/approve-notesheet";
export const newremarkUrl = baseUrl + "/new-remark";
export const revertUrl = baseUrl + "/revert-notesheet";
export const rejectUrl = baseUrl + "/reject-notesheet";
export const sendmessageUrl = baseUrl + "/send-message";
export const privateremarksUrl = baseUrl + "/private-remarks";
