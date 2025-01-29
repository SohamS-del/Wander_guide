import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for user details
interface UserDetails {
  userId: string;
  name: string;
  phone: string;
}

interface UserContextType {
  userDetails: UserDetails | null;
  setUserDetails: (userDetails: UserDetails) => void;
}

// Create the context with the default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserContext Provider to wrap the application and provide user details
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const value = {
    userDetails,
    setUserDetails,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
