// src/pages/wokrlog/EditWorklogPage.tsx
import React from 'react';
import Copyright from '../../components/Copyright';
import H1 from '../../components/general/H1';
import Navbar from '../../components/navigation_bar/NavBar';
import EditWorklogForm from '../../components/worklog/EditWorklogForm';

const EditWorklogPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <div className="flex-grow container mx-auto p-4">
        <H1 id={'edit-a-worklog'} message={'Edit a piece of Work'} className={''} />
        <EditWorklogForm />
      </div>
      <Copyright />
    </div>
  );
};

export default EditWorklogPage;
