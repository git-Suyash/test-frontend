import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export const ApproverProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  if (!user.approveRight) {
    // user is not an approver
    return <Navigate to="/home/created" />;
  }
  return children;
};

export const InsightsProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  if (!user.insightsView) {
    // user is not an insight viewer
    return <Navigate to="/home/created" />;
  }
  return children;
};
export const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  if (!user.admin) {
    // user is not an admin
    return <Navigate to="/home/created" />;
  }
  return children;
};
