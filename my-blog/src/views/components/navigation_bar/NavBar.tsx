import { fold } from 'fp-ts/lib/Either';
import { none, Option, some } from 'fp-ts/lib/Option';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import RoleProtected from '../../../contexts/RoleProtected';
import { UserRoleProvider } from '../../../contexts/UserRoleContext';
import NavbarPages from '../../../models/ADTs/NavbarPages';
import UserTypes from '../../../models/ADTs/UserType';
import UserTypeErrors from '../../../models/ADTs/UserTypeErrors';
import AuthService from '../../../service/AuthService';
import LogoutButton from '../buttons/LogoutButton';

interface NavbarProps {
  page?: NavbarPages;
}


// Toggle Menu Logic
export const useToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prevState) => !prevState);
  return { isOpen, toggleMenu };
};

// Generate Link Class based on active page
export const generateLinkClassName = (page: NavbarPages, navbarPages: NavbarPages) => {
  const baseClasses = 'transition-colors duration-300';
  const activeClasses = 'bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce';
  return page === navbarPages
    ? `text-2xl text-transparent ${activeClasses} hover:text-pink-200`
    : `text-lg text-black ${baseClasses} hover:text-gray-500`;
};

// Fetch User Role and Generate Role-specific Content
export const fetchUserRole = async (setUserBasedContent: React.Dispatch<Option<JSX.Element>>) => {
  const result = await AuthService.getRole();
  fold<UserTypeErrors, UserTypes, void>(
    () => setUserBasedContent(none), // Handle error cases
    (userType) => {
      switch (userType) {
        case UserTypes.Admin:
          setUserBasedContent(some(<p className="text-lg text-pink-500 text-right">Logged in as Admin</p>));
          break;
        case UserTypes.Viewer:
          setUserBasedContent(some(<p className="text-lg text-pink-500 text-right">Logged in as Viewer</p>));
          break;
        default:
          setUserBasedContent(none); // Handle unexpected roles
          break;
      }
    }
  )(result);
};
const Navbar: React.FC<NavbarProps> = ({ page = NavbarPages.Default }) => {
  const { isLoggedIn, logout } = useAuth();
  const { isOpen, toggleMenu } = useToggleMenu();
  const [userBasedContent, setUserBasedContent] = useState<Option<JSX.Element>>(none);

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch user role when the component mounts
  useEffect(() => {
    fetchUserRole(setUserBasedContent);
  }, [isLoggedIn]);

  // Toggle dropdown menu
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <UserRoleProvider>
      {/* Main Navbar */}
      {/* Removed fixed height for dynamic adjustment */}
      <nav className="bg-gray-100 p-4 fixed w-full z-50 border-b-2 border-gray-200">
        <div className="container mx-auto flex justify-between items-start md:items-center"> {/* Align with items-start to support stacking */}
          {/* Home Link */}
          <div className="flex items-center space-x-4">
            <Link id="home" to="/" className={`${generateLinkClassName(page, NavbarPages.Home)}`}>
              Home
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="block md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6 transition-transform transform-gpu"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          {/* Removed height dependency and stacked with flex-col */}
          <div className={`md:flex md:flex-row md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static right-0 top-16 md:top-auto bg-true-blue md:bg-transparent p-4 md:p-0 w-64 md:w-auto shadow-md md:shadow-none rounded-lg md:rounded-none transition-all duration-300`}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              {/* Static Navigation Links */}
              <Link id="about-me" to="/about" className={`text-lg ${generateLinkClassName(page, NavbarPages.About)}`}>
                About Me
              </Link>
              <Link id="contact" to="/contact" className={`text-lg ${generateLinkClassName(page, NavbarPages.Contact)}`}>
                Contact
              </Link>
              <Link id="skills" to="/skills" className={`text-lg ${generateLinkClassName(page, NavbarPages.Skills)}`}>
                Skills
              </Link>
              <Link id="worklog-nav" to="/worklog" className={`text-lg ${generateLinkClassName(page, NavbarPages.Worklog)}`}>
                WorkLog
              </Link>

              {/* Login Link */}
              <Link id="login-nav" to="/login" className={`text-lg ${generateLinkClassName(page, NavbarPages.Login)}`}>
                Login
              </Link>

              {userBasedContent && userBasedContent._tag === 'Some' && userBasedContent.value}

              {/* Stack the buttons vertically */}
              <div className='flex flex-col space-y-4'>
                <RoleProtected roles={[UserTypes.Admin]}>
                  <Link
                    id="login-nav" to="/create-blog-post"
                    className={`bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors`}
                  >
                    Create blog post
                  </Link>
                </RoleProtected>

                {/* Logout Button */}
                <RoleProtected roles={[UserTypes.Admin, UserTypes.Viewer]}>
                  <LogoutButton />
                </RoleProtected>
              </div>

              <RoleProtected roles={[UserTypes.Admin]}>
                {/* Assets Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-lg text-black hover:text-gray-500 focus:outline-none"
                  >
                    Assets
                    <svg
                      className={`w-4 h-4 ml-1 inline-block transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <Link to="/assets/buttons" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Buttons
                      </Link>
                      <Link to="/assets/images" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Images
                      </Link>
                      <Link to="/assets/videos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Videos
                      </Link>
                      <Link to="/assets/loading" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Loading
                      </Link>
                      <Link to="/assets/forms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Forms
                      </Link>
                      <Link to="/assets/checkboxes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Checkboxes
                      </Link>
                      <Link to="/assets/radios" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Radios
                      </Link>
                    </div>
                  )}
                </div>
              </RoleProtected>

            </div>
          </div >
        </div >
      </nav >
    </UserRoleProvider >
  );
};

export default Navbar;
