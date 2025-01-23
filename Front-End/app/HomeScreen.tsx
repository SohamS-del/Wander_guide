import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';




const HomeScreen = ({navigation}: {navigation: any}) => {
    const goTologinPage = () =>{
        navigation.navigate("Login")
      };
    const goToloadingPage = () =>{
        navigation.navigate("LoadingScreen")
      };
    const goToSOSPage = () =>{
        navigation.navigate("SosScreen")
      };
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.homescreentxt}>HomeScreen</Text>
      <Text onPress = {goToloadingPage} style={styles.goback}>
                        LoadingScreen
                      </Text>
      <Text onPress = {goTologinPage} style={styles.goback}>
                        Go Back
                      </Text>
      <Text onPress = {goToSOSPage} style={styles.goback}>
                        SOS
                      </Text>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'white',
    // flex: 1,
    // justifyContent:'center',
    // alignItems:'center'
  },
    homescreentxt:{
        fontSize:30,
        textAlign:'center',
        top:150,
        fontWeight:'bold'
        
    },
    goback:{
        fontSize:20,
        textAlign:"center",
        bottom:-600,
      
    },
    loading:{
        fontSize:20,
        textAlign:"center",
        bottom:-450,
       
    }
})