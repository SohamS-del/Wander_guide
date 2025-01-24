import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { Snackbar } from 'react-native-paper';

const ResetPassword = ({ route, navigation }:any) => {
    const { email } = route.params; // Retrieve email from navigation params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('green'); // Change based on success or error

    const goTologinpage = () => {
        navigation.navigate("Login");
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            showSnackbar('Passwords do not match', 'red');
            return;
        }

        try {
            const response = await fetch('https://localhost:7209/api/Auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Email: email, // Match the key names expected by the backend
                    NewPassword: newPassword,
                    ConfirmPassword: confirmPassword
                })
            });
            const data = await response.json();
            if (response.ok) {
                showSnackbar('Password reset successfully', 'green');
                navigation.navigate('HomeScreen');
            } else {
                showSnackbar(data.message || 'Password reset failed', 'red');
            }
        } catch (error) {
            console.error(error);
            showSnackbar('An error occurred. Please try again.', 'red');
        }
    };

    const showSnackbar = (message: string, color: string): void => {
      setSnackbarMessage(message);
      setSnackbarColor(color);
      setSnackbarVisible(true);
  };
  

    return (
        <SafeAreaView style={[styles.safeArea, styles.container]}>
            <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage}></ImageBackground>
            <Text onPress={goTologinpage} style={styles.backarrow}>
                ←
            </Text>
            <Text style={styles.resettitle}>RESET PASSWORD</Text>
            <TouchableOpacity
                style={styles.OtpButtonStyle}
                onPress={handleResetPassword}
                activeOpacity={0.8}>
                <Text style={styles.OtpButtonTextStyle}>Reset Password</Text>
            </TouchableOpacity>

            <View style={styles.Passcontainer}>
                <TextInput
                    style={styles.EmailtextInput}
                    numberOfLines={4}
                    placeholder='  Enter New Password'
                    placeholderTextColor="#761B89"
                    maxLength={256}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
                <View style={styles.Emailcontainer}>
                    <TextInput
                        style={styles.EmailtextInput2}
                        numberOfLines={4}
                        placeholder='  Confirm New Password'
                        placeholderTextColor="#761B89"
                        maxLength={256}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={{ backgroundColor: snackbarColor }}>
                {snackbarMessage}
            </Snackbar>
        </SafeAreaView>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    google: {
        width: 50,
        height: 50
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
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
        width: 200
    },
    OtpButtonTextStyle: {
        color: 'white',
        fontSize: 20,
    },
    socialAccText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        top: 210,
        color: '#761B89'
    },
    backarrow: {
        position: 'absolute',
        top: 40,
        left: 20,
        fontSize: 40,
        opacity: 0.6,
        color: '#522D7E'
    },
    EmailtextInput: {
        width: 300,
        height: 40,
    },
    EmailtextInput2: {
        width: 300,
        height: 10,
    },
    Emailcontainer: {
        top: -90,
        alignItems: 'center',
        borderColor: '#522D7E',
        borderWidth: 1,
        borderRadius: 7
    },
    Passcontainer: {
        top: -100,
        alignItems: 'center',
        borderColor: '#522D7E',
        borderWidth: 1,
        borderRadius: 7,
    },
    backimage: {
        width: 100,
        height: 100,
        top: -150
    },
    ForgotPassText: {
        fontSize: 14,
        top: -90,
        right: -88,
        color: "#522D7E"
    }
});
