// src/pages/About.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleProtected from '../../contexts/RoleProtected';
import { UserRoleProvider } from '../../contexts/UserRoleContext';
import UserTypes from '../../models/ADTs/UserType';
import { SkillData } from '../../models/SkillData';
import Copyright from '../components/Copyright';
import SkillList from '../components/skills/SkillsList';
import SkillsPagination from '../components/skills/SkillsPagination';
import Spacer from '../components/Spacer';

interface SkillsPageProps {
  skills: SkillData[];
  errorMessage: string;
}

const SkillsPage: React.FC<SkillsPageProps> = ({ skills, errorMessage }) => {

  function sortBySkillName(skills: SkillData[]): SkillData[] {
    return skills.sort((a, b) => a.skill_name.localeCompare(b.skill_name));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 9;
  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;

  const currentSkills = sortBySkillName(skills).slice(indexOfFirstSkill, indexOfLastSkill);


  return (
    <UserRoleProvider>
      <div className="flex flex-col min-h-screen font-nunito bg-gradient-to-r from-green-200 to-orange-300">

        <Spacer size={"p-20"} />
        
        <div className="flex flex-col flex-grow container mx-auto">

          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2">
              {currentSkills.map(skill =>
                <div key={skill.id} className="p-2 sm:p-3 h-full flex"> {/* Ensure equal height */}
                  <SkillList key={skill.id} skill={skill} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-start pb-10">
            <div className="p-2 sm:p-4">
              <SkillsPagination
                skillsPerPage={skillsPerPage}
                currentPage={currentPage}
                totalSkills={skills.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </div>
          </div>

          <RoleProtected roles={[UserTypes.Admin]}>
            <div className="flex justify-start pb-20">
              <Link
                id="add-new-skill"
                to="/create/skill"
                className="inline-block font-nunito p-2 pr-6 pl-6 rounded-md focus:outline-none bg-green-600 text-white hover:bg-green-700 justify-center"
              >
                Add New Skill
              </Link>
            </div>
          </RoleProtected>
          <Spacer size='pb-20' />
        </div>
        <Copyright />
      </div>
    </UserRoleProvider>
  );
};

export default SkillsPage;
