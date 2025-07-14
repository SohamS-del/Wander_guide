import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../LoginScreen';
import Signup from '../SignupScreen';
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
import JourneyDetails from '../JourneyDetails'; // Added JourneyDetails
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SosScreen" component={SosScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ValidateOtp" component={ValidateOtp} options={{ headerShown: false }}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
      <Stack.Screen name="StaticProfileScreen" component={StaticProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{ headerShown: false }}/>
      <Stack.Screen name="SavedContacts" component={SavedContacts} options={{ headerShown: false }}/>
      <Stack.Screen name="EverydayRoutes" component={EverydayRoutes} options={{ headerShown: false }}/>
      <Stack.Screen name="FullListPage" component={FullListPage} options={{ headerShown: false }}/>
      <Stack.Screen name="NearbyPlaces" component={NearbyPlaces} options={{ headerShown: false }}/>
      <Stack.Screen name="StartJourney" component={StartJourney} options={{ headerShown: false }}/>
      <Stack.Screen name="RideInfo" component={RideInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="JourneyDetails" component={JourneyDetails} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default MyStack;
