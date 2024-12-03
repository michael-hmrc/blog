// src/contexts/UserRoleContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Either, fold } from 'fp-ts/lib/Either';
import AuthService from '../service/AuthService';
import UserTypes from '../models/ADTs/UserType';
import UserTypeErrors from '../models/ADTs/UserTypeErrors';

// Define the context type
interface UserRoleContextType {
  userRole: UserTypes | null;
  isAdmin: () => boolean;
  isViewer: () => boolean;
}

// Create a context
const UserRoleContext =
  createContext<UserRoleContextType | undefined>(undefined);

// Hook to use the UserRoleContext
export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

// Provider component to fetch and store user role
export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserTypes | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const result: Either<UserTypeErrors, UserTypes> = await AuthService.getRole();

      fold<UserTypeErrors, UserTypes, void>(
        () => {
          setUserRole(null); // Set null on error or unknown user
        },
        (role) => {
          setUserRole(role);
        }
      )(result);
    };

    fetchUserRole();
  }, []);

  // Helper functions to check roles
  const isAdmin = () => userRole === UserTypes.Admin;
  const isViewer = () => userRole === UserTypes.Viewer;

  return (
    <UserRoleContext.Provider value={{ userRole, isAdmin, isViewer }}>
      {children}
    </UserRoleContext.Provider>
  );
};
