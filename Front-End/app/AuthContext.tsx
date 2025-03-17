import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for better TypeScript support
interface UserType {
  userId: string;
  email: string;
  name?: string;  // Add other fields as per your API response
}

interface AuthContextType {
  user: UserType | null;
  login: (userData: UserType) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

// Create Context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userDetails');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Restore user session
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (userData: UserType) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      setUser(null);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
