import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loginurl } from './components/url';

const Login = ({ navigation }: { navigation: any }) => {
  // State for email and password
  const [UserEmail, SetEmail] = useState('');
  const [UserPassword, SetPassword] = useState('');

  // Navigate to Signup Page
  const goToSignUpPage = () => {
    navigation.navigate('Signup');
  };

  // Handle API call for login
  const goToHomePage = async () => {
    if (!validateInput()) return;

    try {
      let response = await fetch(Loginurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Login failed');
        return;
      }

      const result = await response.json();
      Alert.alert('Success', 'Login Successful');
      
      navigation.navigate('LoadingScreen'); 
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Validate email and password input
  const validateInput = () => {
    if (!UserEmail.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(UserEmail)) {
      Alert.alert('Validation Error', 'Invalid email format');
      return false;
    }
    if (!UserPassword.trim()) {
      Alert.alert('Validation Error', 'Password is required');
      return false;
    }
    if (UserPassword.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long'
      );
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Background Image */}
        <ImageBackground
          source={require('./assets/mit.png')}
          resizeMode="cover"
          style={styles.backimage}
        />

       
        <Text onPress={goToSignUpPage} style={styles.signUpLink}>
          Sign up
        </Text>

       
        <Text style={styles.titleLogin}>Log in</Text>

       
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Email"
            placeholderTextColor="#761B89"
            maxLength={256}
            onChangeText={SetEmail}
            value={UserEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Password"
            placeholderTextColor="#761B89"
            maxLength={256}
            onChangeText={SetPassword}
            value={UserPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.loginButtonStyle}
          onPress={goToHomePage}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonTextStyle}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.socialAccText}>or sign in with Google</Text>
      </KeyboardAvoidingView>
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
    marginBottom: 40,
    textAlign: 'center',
    color: '#522D7E',
  },
  inputContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#522D7E',
    borderRadius: 7,
    marginBottom: 20,
  },
  textInput: {
    height: 45,
    paddingHorizontal: 10,
    color: '#761B89',
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
    marginTop: 20,
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
    position: 'absolute',
    top: 50,
  },
});
