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
  isFirstLaunch: boolean;
}

// Create Context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  isFirstLaunch: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userDetails');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser)); // Handle parsing error
          } catch (parseError) {
            console.error("Error parsing user data:", parseError);
            await AsyncStorage.removeItem('userDetails'); // Clear corrupted data
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem('firstLaunch');
        if (firstLaunch === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('firstLaunch', 'false');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    const initializeApp = async () => {
      await checkUser();
      await checkFirstLaunch();
      setIsLoading(false);
    };

    initializeApp();
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
    <AuthContext.Provider value={{ user, login, logout, isLoading, isFirstLaunch }}>
      {children}
    </AuthContext.Provider>
  );
};
