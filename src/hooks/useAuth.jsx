// useAuth hook
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";

// Create a context for authentication
const AuthContext = createContext();

// Provider component to manage user authentication state
export const AuthProvider = ({ children }) => {
  // Retrieve user data from session storage
  const [user, setUser] = useSessionStorage("user", null);
  const navigate = useNavigate();

  // Function to authenticate user
  const login = async (data) => {
    setUser(data);
    // Redirect user to the home page after login
    navigate("/home/created", { replace: true });
  };

  const adminLogin = async (data) => {
    setUser(data);
    // Redirect user to the admin page after login
    navigate("/admin", { replace: true });
  };

  // Function to log out user
  const logout = () => {
    setUser(null);
    // Redirect user to the login page after logout
    navigate("/", { replace: true });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      adminLogin,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  // Provide the authentication context to child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
