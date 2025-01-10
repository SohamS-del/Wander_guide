import { StyleSheet, Text, View ,SafeAreaView,ImageBackground,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'

const ForgotPasswordScreen = ({navigation}: {navigation: any}) => {

    const goTologinpage = () =>{
        navigation.navigate("Login");
      }
      

    const sendOtp = () =>{
        alert("Otp Sent")
      }
      

  return (
    <SafeAreaView 
          style={[styles.safeArea,styles.container]} >
            <ImageBackground source={require('./assets/mit.png')} resizeMode="cover" style={styles.backimage}></ImageBackground>
            <Text onPress = {goTologinpage}  style={styles.backarrow}>
            ← 
            </Text>
            <Text style={styles.resettitle}>RESET PASSWORD</Text>
             <TouchableOpacity 
                      style={styles.OtpButtonStyle} 
                      onPress={sendOtp} 
                      activeOpacity={0.8}>
                      
                      <Text style={styles.OtpButtonTextStyle}>Send Otp</Text>
                    </TouchableOpacity>
            
            <View style = {styles.Emailcontainer}>
          <TextInput 
                    style={styles.EmailtextInput}
                    numberOfLines={4}
                    placeholder  = '  Enter Your Email'
                    placeholderTextColor="#761B89"
                    maxLength={256}
                    // onChangeText={text =>CheckEmail(text)}
                    // value={UserEmail}
                    
                  />
        </View>
        </SafeAreaView>
        
      )
}

export default ForgotPasswordScreen

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
      resettitle: {
        fontWeight: 'bold',
        fontSize: 20,
        top:-50,
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
        marginLeft:55,
        marginRight:55,
        top:50,
        width:150
      },
      OtpButtonTextStyle: {
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
      backarrow: {
        position: 'absolute',
        top: 40,
        left:20,
        fontSize: 40,
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
        top:-90,
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
    
    },
    ForgotPassText:{
      fontSize:14,
      top:-90,
      right:-88,
      color:"#522D7E"
    }    
})