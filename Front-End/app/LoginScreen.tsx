import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { Loginurl } from './components/url';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }: { navigation: any }) => {

  const [UserEmail, SetEmail] = useState('');
  const [UserPassword, SetPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Navigate to SignUp
  const goToSignUpPage = () => {
    navigation.navigate('Signup');
  };

  // Navigate to Forgot Password
  const forgotpass = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const goToHomePage = async () => {
    if (!validateInput() || loading) return;
    setLoading(true);
  
    try {
      console.log("Starting login process...");
  
      let response = await fetch(Loginurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword,
        }),
      });
  
      console.log("Login response received. Status:", response.status);
  
      let result;
      try {
        result = await response.json();
      } catch (e) {
        console.error("JSON parsing error:", e);
        throw new Error("Invalid JSON response from server.");
      }
  
      console.log("Login response JSON:", result);
  
      if (!result?.userDetails) {
        throw new Error("User details are missing in the response.");
      }
 
      const userDetails = result.userDetails;
      console.log("User details:", userDetails);
      const filteredData = {
        userId: userDetails.userId,
        name: userDetails.name,
      };
  
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      await AsyncStorage.setItem('userDetails', JSON.stringify(filteredData));
  
      console.log("Navigating to NearbyPlaces...");
      navigation.navigate('NearbyPlaces');
  
      showSnackbar("Login Successful");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
      console.log("Login process completed.");
    }
  };
  
  

  // Validate Input
  const validateInput = () => {
    if (!UserEmail.trim()) {
      showSnackbar('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(UserEmail)) {
      showSnackbar('Invalid email format');
      return false;
    }
    if (!UserPassword.trim()) {
      showSnackbar('Password is required');
      return false;
    }
    if (UserPassword.length < 6) {
      showSnackbar('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  // Show Snackbar
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };
 
  return (
    <SafeAreaView style={[styles.safeArea, styles.container]}>
      <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage} />
      
      <Text onPress={goToSignUpPage} style={styles.signUpLink}>Sign up</Text>
      <Text style={styles.titleLogin}>Log in</Text>

      <TouchableOpacity 
        style={[styles.loginButtonStyle, loading && { opacity: 0.6 }]} 
        onPress={goToHomePage} 
        activeOpacity={0.8} 
        disabled={loading}
      >
        <Text style={styles.loginButtonTextStyle}>
          {loading ? 'Logging in...' : 'Log in'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.socialAccText}>or sign in with Google</Text>

      <View style={styles.Emailcontainer}>
        <TextInput
          style={styles.EmailtextInput}
          placeholder="   Enter Your Email"
          placeholderTextColor="#761B89"
          onChangeText={SetEmail}
          value={UserEmail}
        />
      </View>

      <View style={styles.Passcontainer}>
        <TextInput
          placeholder="   Enter Your Password"
          placeholderTextColor="#761B89"
          onChangeText={SetPassword}
          value={UserPassword}
          style={styles.PasstextInput}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={forgotpass} style={styles.forgotpassTouch}>
          <Text style={styles.ForgotPassText}>Forgot Password ?</Text>
        </TouchableOpacity>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default Login;



  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    titleLogin: {
      fontWeight: 'bold',
      fontSize: 32,
      marginBottom: 70,
      textAlign: 'center',
      color: '#522D7E',
    },
    loginButtonStyle: {
      backgroundColor: '#522D7E',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowOpacity: 0.9,
      shadowRadius: 3.5,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: 'grey',
      width: '90%',
      top: 180,
    },
    loginButtonTextStyle: {
      color: 'white',
      fontSize: 20,
    },
    socialAccText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: '#761B89',
      bottom: -200,
    },
    signUpLink: {
      position: 'absolute',
      top: 40,
      right: 20,
      fontSize: 18,
      opacity: 0.6,
      color: '#522D7E',
    },
    backimage: {
      width: 100,
      height: 100,
      top: -80,
    },
    EmailtextInput: {
      width: 300,
      height: 45,
    },
    Emailcontainer: {
      top: -120,
      alignItems: 'center',
      borderColor: '#522D7E',
      borderWidth: 1,
      borderRadius: 7,
    },
    PasstextInput: {
      borderColor: 'black',
      width: 300,
      height: 45,
    },
    Passcontainer: {
      top: -100,
      alignItems: 'center',
      borderColor: '#522D7E',
      borderWidth: 1,
      borderRadius: 7,
    },
    ForgotPassText: {
      color: '#522D7E',
    },
    forgotpassTouch:{
      
      fontSize: 14,
      top: -90,
      right: -88,
    }
  });
