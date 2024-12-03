// src/pages/About.tsx
import React from 'react';
import LoginNavbarPages from '../../models/ADTs/LoginNavbarPages';
import Copyright from '../components/Copyright';
import LoginNavigationbar from '../components/navigation_bar/LoginNavigationBar';
import ForgottenPasswordForm from '../forms/ForgottenPasswordForm';

const ForgottenPasswordPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-stone-200">
      <LoginNavigationbar page={LoginNavbarPages.ForgottenPassword} />
      <div className="flex-grow container mx-auto p-2">
        <ForgottenPasswordForm />
      </div>
      <Copyright />
    </div>
  );
};

export default ForgottenPasswordPage;
