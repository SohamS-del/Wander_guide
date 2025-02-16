import React from 'react';
import MyStack from './MyStack';
import { AuthProvider } from '../AuthContext';

export default function App() {
  return (
    <AuthProvider>
      
        <MyStack />
     
    </AuthProvider>
  );
}
