import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingScreen from '../LoadingScreen';
import Login from '../LoginScreen';
import Signup from '../SignupScreen';
import HomeScreen from '../HomeScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import SosScreen from '../SosScreen';
import { TransitionPresets, TransitionSpecs } from '@react-navigation/bottom-tabs';
import ValidateOtp from '../ValidateOtp';
import ResetPassword from '../ResetPassword';
import NearbyPlaces from '../NearbyPlacesScreen';

const MyStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator initialRouteName='LoadingScreen' screenOptions={{headerShown:false,gestureEnabled:true,gestureDirection:"horizontal"}}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="SosScreen" component={SosScreen} />
        <Stack.Screen name="ValidateOtp" component={ValidateOtp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="NearbyPlaces" component={NearbyPlaces}/>
      </Stack.Navigator>
    
  );
};
export default MyStack;