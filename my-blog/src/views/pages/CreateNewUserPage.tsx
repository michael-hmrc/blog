// src/pages/About.tsx
import React from 'react';
import LoginNavbarPages from '../../models/ADTs/LoginNavbarPages';
import Copyright from '../components/Copyright';
import LoginNavigationbar from '../components/navigation_bar/LoginNavigationBar';
import Spacer from '../components/Spacer';
import CreateUserForm from '../forms/CreateUserForm';

const CreateNewUserPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-stone-200">
      <Spacer size='p-20' />
      <div className="flex-grow container mx-auto p-4">
        <CreateUserForm />
      </div>
      <Copyright />
    </div>
  );
};

export default CreateNewUserPage;
