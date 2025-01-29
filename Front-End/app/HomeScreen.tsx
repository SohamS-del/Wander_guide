import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';




const HomeScreen = ({navigation}: {navigation: any}) => {
    const Gobackbutton = () =>{
        navigation.navigate("Signup")
      };
    const goToloadingPage = () =>{
        navigation.navigate("LoadingScreen")
      };
    const goToSOSPage = () =>{
        navigation.navigate("SosScreen")
      };
    const goToProfileScreenPage = () =>{
        navigation.navigate("ProfileScreen")
      };
    const goToEmergencyContacts = () =>{
        navigation.navigate("EmergencyContacts")
      };
    
      const handleViewLocation = () => {
        navigation.navigate('CurrentLocationSend'); // Navigate to the NearbyPlaces screen when the button is pressed
      };
      const gotoEverydayRoutes = () => {
        navigation.navigate("EverydayRoutes"); // Navigate to the NearbyPlaces screen when the button is pressed
      };
      const gotoNearbyPlaces = () => {
        navigation.navigate("NearbyPlaces"); // Navigate to the NearbyPlaces screen when the button is pressed
      };
      const goToLoginPage = () => {
        navigation.navigate("Login"); // Navigate to the NearbyPlaces screen when the button is pressed
      };
      
  return (
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.homescreentxt}>HomeScreen</Text>
      <Text onPress = {goToloadingPage} style={styles.lode}>
                        LoadingScreen
                      </Text>
      <Text onPress = {Gobackbutton} style={styles.goback}>
                        Signup
                      </Text>
      <Text onPress = {gotoEverydayRoutes} style={styles.goback}>
                        EverydayRoutes
                      </Text>
      <Text onPress = {gotoNearbyPlaces} style={styles.goback}>
                        NearbyPlaces
                      </Text>
      <Text onPress = {goToProfileScreenPage} style={styles.goback}>
                        User Details
                      </Text>
      <Text onPress = {goToEmergencyContacts} style={styles.goback}>
                       EmergencyContacts
                      </Text>
      <Text onPress = {goToSOSPage} style={styles.goback}>
                        SOS
                      </Text>
      <Text onPress = {goToLoginPage} style={styles.goback}>
                        Login
                      </Text>
        
      
                      <Button  title="View Location on Map" onPress={handleViewLocation } />
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
  },
  button:{
    backgroundColor:'red'
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
        bottom:-400,
        margin:10
      
    },
    loading:{
        fontSize:20,
        textAlign:"center",
        bottom:-450,
       
    },
    lode:{
      fontSize:20,
        textAlign:"center",
        bottom:-400,
        marginTop:10

    }
})