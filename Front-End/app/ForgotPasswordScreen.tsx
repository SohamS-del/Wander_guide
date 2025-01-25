import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

const ForgotPasswordScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('');

  const goTologinpage = () => {
    navigation.navigate('Login');
  };

  const sendOtp = async () => {
    try {
      const response = await fetch('https://localhost:7209/api/Auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSnackbarMessage('OTP has been sent to your email');
        setSnackbarColor('#4CAF50'); // Success color
        setSnackbarVisible(true);
        navigation.navigate('ValidateOtp', { email }); // Pass email to next screen
      } else {
        setSnackbarMessage(data.message || 'An error occurred!');
        setSnackbarColor('#f44336'); // Error color
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Network error. Please try again later.');
      setSnackbarColor('#f44336'); // Error color
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, styles.container]}>
      <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage}></ImageBackground>
      <Text onPress={goTologinpage} style={styles.backarrow}>
        ←
      </Text>
      <Text style={styles.resettitle}>RESET PASSWORD</Text>
      <TouchableOpacity style={styles.OtpButtonStyle} onPress={sendOtp} activeOpacity={0.8}>
        <Text style={styles.OtpButtonTextStyle}>Send Otp</Text>
      </TouchableOpacity>
      <View style={styles.Emailcontainer}>
        <TextInput
          style={styles.EmailtextInput}
          numberOfLines={4}
          placeholder="  Enter Your Email"
          placeholderTextColor="#761B89"
          maxLength={256}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarColor }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

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
  resettitle: {
    fontWeight: 'bold',
    fontSize: 20,
    top: -50,
    marginBottom: 40,
    textAlign: 'center',
    color: '#522D7E',
  },
  OtpButtonStyle: {
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
    marginLeft: 55,
    marginRight: 55,
    top: 50,
    width: 200,
  },
  OtpButtonTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  backarrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 40,
    opacity: 0.6,
    color: '#522D7E',
  },
  EmailtextInput: {
    width: 300,
    height: 45,
  },
  Emailcontainer: {
    top: -90,
    alignItems: 'center',
    borderColor: '#522D7E',
    borderWidth: 1,
    borderRadius: 7,
  },
  backimage: {
    width: 100,
    height: 100,
    top: -150,
  },
});
