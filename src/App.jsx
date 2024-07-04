import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import { AppRoutes } from './Routes.jsx';

function App() {
  return <div className="App">
    {/* Set up the React Router for navigation */}
    <Router>
      {/* Provide authentication context to child components */}
      <AuthProvider>
        {/* Render application routes */}
        <AppRoutes />
      </AuthProvider>
    </Router>

  </div>;
}

export default App;
