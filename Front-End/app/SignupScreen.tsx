import { StyleSheet, StatusBar, TextInput, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { SignUpUrl } from './components/url'; // Ensure this URL is correct and exported

const Signup = ({ navigation }: { navigation: any }) => {
  const [UserEmail, SetEmail] = React.useState('');
  const [UserPassword, SetPassword] = React.useState('');
  const [UserConfirm, SetConfirm] = React.useState('');

  // Navigation to login page
  const goTologinPage = () => {
    navigation.navigate('Login');
  };

  // Sign-up button handler
  const SignUpButton = async () => {
    if (!UserEmail || !UserPassword || !UserConfirm) {
      alert('Please fill all the fields!');
      return;
    }
    if (UserPassword !== UserConfirm) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(SignUpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: UserEmail,
          Password: UserPassword,
          ConfirmPassword: UserConfirm,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('User Created Successfully!');
        navigation.navigate('LoadingScreen'); // Redirect on success
      } else {
        alert(result.message || 'Signup Failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, styles.container]}>
      <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage}></ImageBackground>
      <Text onPress={goTologinPage} style={styles.signUpLink}>
        Log in
      </Text>
      <Text style={styles.titleLogin}>Sign Up</Text>
      <View style={styles.Emailcontainer}>
        <TextInput
          style={styles.EmailtextInput}
          numberOfLines={1}
          placeholder="Enter Your Email"
          placeholderTextColor="#761B89"
          maxLength={256}
          onChangeText={SetEmail}
          value={UserEmail}
        />
      </View>
      <View style={styles.Passcontainer}>
        <TextInput
          numberOfLines={1}
          placeholder="Enter Your Password"
          placeholderTextColor="#761B89"
          maxLength={256}
          onChangeText={SetPassword}
          value={UserPassword}
          style={styles.PasstextInput}
          secureTextEntry
        />
      </View>
      <View style={styles.Confirmcontainer}>
        <TextInput
          numberOfLines={1}
          placeholder="Confirm Your Password"
          placeholderTextColor="#761B89"
          maxLength={256}
          onChangeText={SetConfirm}
          value={UserConfirm}
          style={styles.ConfirmtextInput}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginButtonStyle} onPress={SignUpButton} activeOpacity={0.8}>
        <Text style={styles.loginButtonTextStyle}>Create Account</Text>
      </TouchableOpacity>
      <Text style={styles.socialAccText}>By clicking above you are agreeing to our Terms and Conditions.</Text>
    </SafeAreaView>
  );
};

export default Signup;

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
    marginBottom: 20,
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
    elevation: 3,
    shadowOpacity: 0.9,
    shadowRadius: 3.5,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'grey',
    marginTop: 20,
    width: 330,
  },
  loginButtonTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  socialAccText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
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
  EmailtextInput: {
    width: 300,
    height: 45,
  },
  Emailcontainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#522D7E',
    borderWidth: 1,
    borderRadius: 7,
  },
  PasstextInput: {
    width: 300,
    height: 45,
  },
  Passcontainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#522D7E',
    borderWidth: 1,
    borderRadius: 7,
  },
  ConfirmtextInput: {
    width: 300,
    height: 45,
  },
  Confirmcontainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#522D7E',
    borderWidth: 1,
    borderRadius: 7,
  },
  backimage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
