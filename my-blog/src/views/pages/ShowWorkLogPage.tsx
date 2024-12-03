import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleProtected from '../../contexts/RoleProtected';
import NavbarPages from '../../models/ADTs/NavbarPages';
import { WorkLogData } from '../../models/WorkLogData';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Spacer from '../components/Spacer';
import WorkLogGrid from '../components/worklog/WorkLogGrid';
import WorkLogPagination from '../components/worklog/WorkLogPagination';
import YearSearchBar from '../components/worklog/YearSearchBar';
import UserTypes from '../../models/ADTs/UserType';
import { UserRoleProvider } from '../../contexts/UserRoleContext';

interface WorkLogPageProps {
  worklogs: WorkLogData[];
  errorMessage: string;
}

const ShowWorkLogPage: React.FC<WorkLogPageProps> = ({ worklogs, errorMessage }) => {

  // Helper function to sort worklogs by creation time
  function sortByWorkLogCreationTime(worklogs: WorkLogData[]): WorkLogData[] {
    return worklogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // State to manage pagination and year filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [searchYear, setSearchYear] = useState<number | null>(null);

  // Determine years available for filtering
  const years = Array.from(new Set(worklogs.map(worklog => new Date(worklog.created_at).getFullYear())));

  // Define worklogs per page and pagination calculations
  const worklogPerPage = 2;
  const indexOfLastTask = currentPage * worklogPerPage;
  const indexOfFirstTask = indexOfLastTask - worklogPerPage;

  // Filter worklogs based on searchYear if applicable
  const filteredWorklogs = searchYear
    ? worklogs.filter(worklog => new Date(worklog.created_at).getFullYear() === searchYear)
    : worklogs;

  // Get current worklogs to display on the page
  const currentTasks = sortByWorkLogCreationTime(filteredWorklogs).slice(indexOfFirstTask, indexOfLastTask);

  return (
    <UserRoleProvider>
      <div className="flex flex-col min-h-screen font-nunito bg-gradient-to-r from-pink-100 via-purple-200 to-blue-200">
        {/* <Navbar page={NavbarPages.Worklog} /> */}
        <Spacer size={"p-20"} />

        <div className="flex flex-col flex-grow container mx-auto">
          {/* Year Search Bar */}
          <YearSearchBar onYearSearch={setSearchYear} />

          {/* Top Pagination */}
          <div className="sm:p-2">
            <WorkLogPagination
              worklogPerPage={worklogPerPage}
              totalWorklogs={filteredWorklogs.length}
              currentPage={currentPage}  // Pass currentPage to pagination
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>

          {/* Worklog Grid Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 h-full w-full gap-4 mt-4">
            {currentTasks.map(worklog => (
              <WorkLogGrid key={worklog.id} workLogData={worklog} />
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="flex justify-start pb-10">
            <div className="sm:p-4">
              <WorkLogPagination
                worklogPerPage={worklogPerPage}
                totalWorklogs={filteredWorklogs.length}
                currentPage={currentPage}  // Pass currentPage to pagination
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </div>
          </div>

          {/* Add New Work Log Button for Admin Users */}
          <RoleProtected roles={[UserTypes.Admin]}>
            <div className="flex justify-start pb-20">
              <Link
                id="add-new-work"
                to="/worklog/add/new/worklog"
                className="inline-block font-nunito p-2 pr-6 pl-6 rounded-md focus:outline-none bg-green-600 text-white hover:bg-green-700 justify-center"
              >
                Add New Piece of Work
              </Link>
            </div>
          </RoleProtected>
        </div>

        <Spacer size='pb-20' />
        <Copyright />
      </div>
    </UserRoleProvider>
  );
};

export default ShowWorkLogPage;
