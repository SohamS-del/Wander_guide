import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingScreen from '../LoadingScreen';
import Login from '../LoginScreen';
import Signup from '../SignupScreen';
import HomeScreen from '../HomeScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';

const MyStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator initialRouteName='LoadingScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    
  );
};
export default MyStack;