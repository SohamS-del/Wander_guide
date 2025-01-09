import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';




const HomeScreen = ({navigation}: {navigation: any}) => {
    const goTologinPage = () =>{
        navigation.navigate("Login")
      };
    const goToloadingPgage = () =>{
        navigation.navigate("LoadingScreen")
      };
  return (
    <SafeAreaView >
      <Text style = {styles.homescreentxt}>HomeScreen</Text>
      <Text onPress = {goToloadingPgage} style={styles.goback}>
                        LoadingScreen
                      </Text>
      <Text onPress = {goTologinPage} style={styles.goback}>
                        Go Back
                      </Text>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    
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