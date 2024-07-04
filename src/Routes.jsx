
import { Route, Routes } from "react-router-dom"
import { AdminProtectedRoute, ApproverProtectedRoute, AuthProtectedRoute, InsightsProtectedRoute } from "./components/ProtectedRoute"
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { CreatedPage } from "./pages/CreatedPage"
import { ApproverPage } from "./pages/ApproverPage"
import { NotesheetEditPage } from "./pages/NotesheetEditPage"
import { AdminPage } from "./pages/AdminPage"
import { NotesheetDetailPage } from "./pages/NotesheetDetailPage"
import { NotesheetCreatePage } from "./pages/NotesheetCreatePage"
import UserProfilePage from "./pages/UserProfilePage"

import { PrivateChannelPage } from "./pages/PrivateChannelPage"
import { InsightsPage } from "./pages/InsightsPage"

import { UsPage } from "./pages/UsPage"

import { AdminEditPage } from "./pages/AdminEditPage"
import { AdminAddPage } from "./pages/AdminAddPage"
import { AdminLoginPage } from "./pages/AdminLoginPage"
import { AdminNotesheetPage } from "./pages/AdminNotesheetPage"

/**
 * @fileOverview Defines the routing configuration for the application.
 * @module AppRoutes
 */

/**
 * Defines the routing configuration for the application using React Router's Routes component.
 * @returns {JSX.Element} The component containing the defined routes.
 */
export const AppRoutes = () => {
    return (
        <Routes>
            {/* Route for the login page */}
            <Route path="/" element={<LoginPage />} />
            {/* Protected routes accessible only when authenticated */}
            <Route path='/home'
                element={
                    <AuthProtectedRoute>
                        {/* Home page accessible after authentication */}
                        <HomePage />
                    </AuthProtectedRoute>}
            >
                {/* Sub-routes for authenticated users */}
                <Route path="created" element={<AuthProtectedRoute> <CreatedPage /></AuthProtectedRoute>} />
                {/* Approval page accessible only to approvers after authentication */}
                <Route path="approval" element={<AuthProtectedRoute><ApproverProtectedRoute><ApproverPage /></ApproverProtectedRoute></AuthProtectedRoute>} />
                {/* Detail page for notesheets accessible after authentication */}
                <Route path="notesheet" element={<AuthProtectedRoute><NotesheetDetailPage /></AuthProtectedRoute>} />
                {/* Page for creating new notesheets accessible after authentication */}
                <Route path="create" element={<AuthProtectedRoute> <NotesheetCreatePage /></AuthProtectedRoute>} />
                {/* Page for editing notesheets accessible after authentication */}
                <Route path="edit" element={<AuthProtectedRoute> <NotesheetEditPage /></AuthProtectedRoute>} />
                <Route path="private-channel" element={<AuthProtectedRoute> <PrivateChannelPage /></AuthProtectedRoute>} />
            </Route>
            <Route path="/insight" element={<AuthProtectedRoute> <InsightsPage /></AuthProtectedRoute>} />
            {/* Admin page accessible after authentication */}
            <Route path="/admin" element={<AdminProtectedRoute> <AdminPage /></AdminProtectedRoute>} >
                <Route path="user-edit" element={<AdminProtectedRoute><AdminEditPage /></AdminProtectedRoute>} />
                <Route path="user-add" element={<AdminProtectedRoute><AdminAddPage /></AdminProtectedRoute>} />
                <Route path="notesheets" element={<AdminProtectedRoute><AdminNotesheetPage /></AdminProtectedRoute>} />
                <Route path="notesheet" element={<AdminProtectedRoute><NotesheetDetailPage /></AdminProtectedRoute>} />
            </Route>

            {/* User profile page accessible after authentication */}
            <Route path="/profile" element={<AuthProtectedRoute><UserProfilePage /></AuthProtectedRoute>} />

            {/* Logout route, placeholder for logout functionality */}
            <Route path="/logout" element={<AuthProtectedRoute></AuthProtectedRoute>} />
            {/* Catch-all route for unknown paths */}
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/aboutus" element={<UsPage />} />
        </Routes>
    );
};
