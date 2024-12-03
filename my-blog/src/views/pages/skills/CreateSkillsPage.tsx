// src/pages/About.tsx
import React from 'react';
import Copyright from '../../components/Copyright';
import H1 from '../../components/general/H1';
import Navbar from '../../components/navigation_bar/NavBar';
import SkillCreator from '../../components/skills/SkillCreator';
import Spacer from '../../components/Spacer';

const CreateSkillsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Spacer size='pb-20' />
      <H1 id={"add-a-new-skill-h1"} message={"Add a new skill"} className={""} />
      <div className="flex-grow container mx-auto p-4">
        <SkillCreator />
      </div>
      <Copyright />
    </div>
  );
};

export default CreateSkillsPage;
