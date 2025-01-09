import { StyleSheet, StatusBar,TextInput, Text, View, TouchableOpacity,TouchableHighlight,ImageBackground} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Loginurl } from './components/url';



//main code
const Login = ({navigation}: {navigation: any}) => {
  
  
  const goToSignUpPage = () =>{
    navigation.navigate("Signup");
  }
  //apicallbutton
  const goToHomePage = async() =>{

    let result = await fetch(Loginurl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //changes due!@!!
        email: UserEmail,
        password: UserPassword,
        rememberme:true
      })
    });
    result = await result.json();
    if(result){
      alert("Data has been added")
    }
  }


  
  //loginbutton
  const [UserEmail, SetEmail] = React.useState('');
  
  //passwordbutton
  const [UserPassword, SetPassword] = React.useState('');

   //rememberme
   const rememberme = true;
  
  

 
  return (
    <SafeAreaView 
      style={[styles.safeArea,styles.container]} >
        <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage}></ImageBackground>
        <Text onPress = {goToSignUpPage}  style={styles.signUpLink}>
          Sign up
        </Text>
        <Text style={styles.titleLogin}>Log in</Text>
         <TouchableOpacity 
                  style={styles.loginButtonStyle} 
                  onPress={goToHomePage} 
                  activeOpacity={0.8}>
                  
                  <Text style={styles.loginButtonTextStyle}>Log in</Text>
                </TouchableOpacity>
        <Text 
         style={styles.socialAccText}>or sign in with Google
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
       
        
    </SafeAreaView>
    
  );
  
  
};

export default Login;

const styles = StyleSheet.create({
  google:{
    width:50,
    height:50
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
  titleLogin: {
    fontWeight: 'bold',
    fontSize: 32,
    top:-100,
    marginBottom: 40,
    textAlign: 'center',
    color: '#522D7E'
    
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
    marginLeft:55,
    marginRight:55,
    top:200,
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
    top:210,
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
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#009D6E',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
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
},
backimage:{
  width:100,
  height:100,
  top:-150

}
});
