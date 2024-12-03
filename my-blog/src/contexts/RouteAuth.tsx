import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTypes from '../models/ADTs/UserType';
import { useUserRole } from './UserRoleContext';

interface RouteAuthProps {
  roles: UserTypes[];
  fallback?: JSX.Element;
  children: React.ReactNode;
}

const RouteAuth: React.FC<RouteAuthProps> = ({ roles = [UserTypes.NotLoggedIn], fallback, children }) => {
  const { userRole } = useUserRole(); // Get the user role from context
  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    // Redirect to unauthorized if the user's role does not match
    if (userRole && !roles.includes(userRole)) {
      navigate('/unauthorized');
    }

  }, [userRole, roles, navigate]); // Dependencies for useEffect

  // If the role is correct, render children
  if (userRole && roles.includes(userRole)) {
    console.log(`console log: ${userRole}`);
    return <>{children}</>;
  }

  // If there's no userRole yet, render fallback or nothing
  return fallback || <></>;
};

export default RouteAuth;
