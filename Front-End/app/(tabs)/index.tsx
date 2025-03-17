import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from '../AuthContext';
import LoadingScreen from '../LoadingScreen';
import Login from '../LoginScreen';
import Signup from '../SignupScreen';
import HomeScreen from '../HomeScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import SosScreen from '../SosScreen';
import ValidateOtp from '../ValidateOtp';
import ResetPassword from '../ResetPassword';
import EmergencyContacts from '../EmergencyContacts';
import SavedContacts from '../SavedContacts';
import EverydayRoutes from '../EverydayRoutes';
import FullListPage from '../FullListPage';
// import CurrentLocationSend from '../CurrentLocationSend';
import NearbyPlaces from '../NearbyPlaces';
import StartJourney from '../StartJourney';
import RideInfo from '../RideInfo';
import StaticProfileScreen from '../static_profile';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const { user, isLoading } = useContext(AuthContext);
  console.log("Auth State:", { user, isLoading });

  // ✅ Show loading screen while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      {/* Authentication Screens */}
      {!user ? (
        <>
         {/* <Stack.Screen name="Login" component={Login} />  */}
         <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      )}

      {/* Other Screens */}
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="Login" component={Login} />
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
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
     
        <MyStack />
     
    </AuthProvider>
  );
};

export default App;
