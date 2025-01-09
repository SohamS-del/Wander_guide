
import { StyleSheet, StatusBar,TextInput, Text, View, TouchableOpacity,ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Signup = ({navigation}: {navigation: any}) => {

  const goTologinPage = () =>{
    navigation.navigate("Login")
  };
  const SignUpButton = () => {
    alert(`Your account has been created`);
    navigation.navigate("HomeScreen")
  };

  //loginbutton
    const [UserEmail, SetEmail] = React.useState('');
    
  //passwordbutton
  const [UserPassword, SetPassword] = React.useState('');

  //confirmbutton
  const [UserConfirm, SetConfirm] = React.useState('');

  //rememberme
  const rememberme = true;

    

  return (
    <SafeAreaView 
      style={[styles.safeArea,styles.container]}>
        <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage}></ImageBackground>
        <Text onPress = {goTologinPage} style={styles.signUpLink}>
                  Log in
                </Text>
          <Text style={styles.titleLogin}>Sign Up</Text>
        <TouchableOpacity 
                  style={styles.loginButtonStyle} 
                  onPress={SignUpButton} 
                  activeOpacity={0.8}>
                  <Text style={styles.loginButtonTextStyle}>Create Account</Text>
                </TouchableOpacity>
        <Text 
         style={styles.socialAccText}>By clicking above you are agreeing to our Terms and Conditions.
        </Text>
        <View style = {styles.Emailcontainer}>
              <TextInput 
                        style={styles.EmailtextInput}
                        numberOfLines={4}
                        placeholder  = '  Enter Your Email'
                        placeholderTextColor="#761B89"
                        maxLength={256}
                        onChangeText={text =>SetEmail(text)}
                        value={UserEmail}
                        
                      />
            </View>
            <View style = {styles.Passcontainer}>
              <TextInput
                        numberOfLines={4}
                        placeholder='  Enter Your Password'
                        placeholderTextColor="#761B89"
                        maxLength={256}
                        onChangeText={text =>SetPassword(text)}
                        value={UserPassword}
                        style={styles.PasstextInput}
                        secureTextEntry
                      />
            </View>
        <View style = {styles.Confirmcontainer}>
              <TextInput
                        numberOfLines={4}
                        placeholder  = '  Confirm Your Password'
                        placeholderTextColor="#761B89"
                        maxLength={256}
                        onChangeText={text =>SetConfirm(text)}
                        value={UserConfirm}
                        style={styles.ConfirmtextInput}
                        secureTextEntry
                      />
            </View>
        
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
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    paddingHorizontal: 16,
    
  },
  titleLogin: {
    fontWeight: 'bold',
    fontSize: 32,
    top:-65,
    marginBottom: 40,
    textAlign: 'center',
    color:'#522D7E'
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
    marginLeft:55,
    marginRight:55,
    top:240,
    width:330
  },
  loginButtonTextStyle: {
    color: 'white',
    fontSize: 20,
  },
  socialAccText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    top:240,
    color:'#761B89'
  },
  signUpLink: {
    position: 'absolute',
    top: 40,
    right: 20,
    fontSize: 18,
    opacity: 0.6,
    color:'#522D7E'
  },
  EmailtextInput:{
    width:300,
    height:45
 },
  Emailcontainer:{
    top:-120,
    alignItems:'center',
    borderColor:'#522D7E',
    borderWidth:1,
    borderRadius:7
},
PasstextInput:{
  borderColor:'black',
  width:300,
  height:45,
  
},
Passcontainer:{
  top:-100,
  alignItems:'center',
  borderColor:'#522D7E',
  borderWidth:1,
  borderRadius:7,
},ConfirmtextInput:{
  borderColor:'black',
  width:300,
  height:45,
},
Confirmcontainer:{
  top:-80,
  alignItems:'center',
  borderColor:'#522D7E',
  borderWidth:1,
  borderRadius:7,
},
backimage:{
  width:100,
  height:100,
  top:-115
}
});
