import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../LoginScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import SosScreen from '../SosScreen';
import ValidateOtp from '../ValidateOtp';
import ResetPassword from '../ResetPassword';
import EmergencyContacts from '../EmergencyContacts';
import SavedContacts from '../SavedContacts';
import EverydayRoutes from '../EverydayRoutes';
import FullListPage from '../FullListPage';
import NearbyPlaces from '../NearbyPlaces';
import StartJourney from '../StartJourney';
import RideInfo from '../RideInfo';
import StaticProfileScreen from '../static_profile';
import HomeScreen from '../HomeScreen'; // Added HomeScreen

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="SosScreen" component={SosScreen} />
      <Stack.Screen name="ValidateOtp" component={ValidateOtp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="StaticProfileScreen" component={StaticProfileScreen} />
      <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
      <Stack.Screen name="SavedContacts" component={SavedContacts} />
      <Stack.Screen name="EverydayRoutes" component={EverydayRoutes} />
      <Stack.Screen name="FullListPage" component={FullListPage} />
      <Stack.Screen name="NearbyPlaces" component={NearbyPlaces} />
      <Stack.Screen name="StartJourney" component={StartJourney} />
      <Stack.Screen name="RideInfo" component={RideInfo} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MyStack;
