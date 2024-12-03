// src/AppWithRouter.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const AppWithRouter: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </ AuthProvider>
  );
};

export default AppWithRouter;
