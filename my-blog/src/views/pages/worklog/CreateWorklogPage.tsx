// src/pages/About.tsx
import React from 'react';
import Copyright from '../../components/Copyright';
import H1 from '../../components/general/H1';
import Navbar from '../../components/navigation_bar/NavBar';
import CreateWorklogForm from '../../components/worklog/CreateWorklogForm';

const CreateWorklogPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <H1 id={"add-a-new-skill-h1"} message={"Add a new Work log"} className={""} />
      <div className="flex-grow container mx-auto p-4">
        <CreateWorklogForm />
      </div>
      <Copyright />
    </div>
  );
};

export default CreateWorklogPage;
