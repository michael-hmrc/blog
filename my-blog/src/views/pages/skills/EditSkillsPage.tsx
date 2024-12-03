// src/pages/About.tsx
import React from 'react';
import Copyright from '../../components/Copyright';
import EditSkillForm from '../../components/skills/EditSkillForm';
import Spacer from '../../components/Spacer';

const EditSkillsPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Spacer size='pb-20' />
      <div className="flex-grow container mx-auto p-4">
        <Spacer size='pb-20' />
        <EditSkillForm />
      </div>
      <Copyright />
    </div>
  );
};

export default EditSkillsPage;
