import { StyleSheet, Text, View,Button, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import StartJourney from './StartJourney';




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
      const StartJourney = () => {
        navigation.navigate("StartJourney"); // Navigate to the NearbyPlaces screen when the button is pressed
      };
      
  return (
    <SafeAreaView style = {styles.container}>
<StatusBar backgroundColor="#522D7E" barStyle="light-content" />
      <Text style={styles.manageAccount}>Manage your account</Text>

      <Text onPress = {gotoEverydayRoutes} style={styles.goback}>
                         Pool car
                      </Text>

                      <Text onPress = {StartJourney} style={styles.goback}>
                         Start journey
                      </Text>
      <Text onPress = {gotoNearbyPlaces} style={styles.goback}>
      Home
                      </Text>
      <Text onPress = {goToProfileScreenPage} style={styles.goback}>
                        My Account
                      </Text>
      <Text onPress = {goToEmergencyContacts} style={styles.goback}>
                       My Emergency Contacts
                      </Text>
      <Text onPress = {goToSOSPage} style={styles.goback}>
                        SOS
                      </Text>

        
    <TouchableOpacity onPress={handleViewLocation}>
    <Text style={styles.goback}>
                        My Location
                      </Text>
    </TouchableOpacity>

    <Text onPress = {goToSOSPage} style={styles.goback}>
                        LOGOUT
                      </Text>
      
                      {/* <Button  title="View Location on Map" onPress={handleViewLocation } /> */}
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {

    flex: 1,
    width:"90%",
    marginLeft:"5%"
  },
  manageAccount:{
    fontSize:30,
    fontWeight:"700",
    marginTop:30,
    marginBlock:30
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
        fontSize:18,
        textAlign:"left",
        backgroundColor:"white",
        marginTop:20,
        padding:18,
        borderRadius:10,
        borderLeftWidth:5,
        borderLeftColor:"#5D5D5D"
      
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