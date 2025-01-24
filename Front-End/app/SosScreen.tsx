import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

let holdTimeout = null; // Declare this variable outside the component to persist across renders

const SosScreen = ({navigation}:{navigation: any}) => {

  const [pressTimes, setPressTimes] = useState([]); // Store timestamps of button presses
  const MAX_SPAM_COUNT = 6; // Number of presses to trigger alert
  const SPAM_INTERVAL = 10000; // 10 seconds in milliseconds

  // const handleSosPress = () => {
  //   try {
  //     const currentTime = Date.now(); // Get current timestamp in milliseconds

  //     // Add the current timestamp and filter out timestamps older than SPAM_INTERVAL
  //     setPressTimes ( (prevPressTimes) => {
  //       const updatedPressTimes = [...prevPressTimes, currentTime].filter(
  //         (time) => currentTime - time <= SPAM_INTERVAL
  //       );

  //       // Check if the button was pressed enough times
  //       if (updatedPressTimes.length >= MAX_SPAM_COUNT) {
  //         Alert.alert('SOS Alert', 'SOS message has been sent!');
  //         return []; // Reset the pressTimes array after triggering the alert
  //       }

  //       return updatedPressTimes; // Keep the updated timestamps in state
  //     });
  //   } catch (error) {
  //     console.error('Error handling SOS button press:', error);
  //   }
  // };


  const goToHomeScreen = () =>{
    navigation.navigate("HomeScreen");
  }

  return (
    <View style={styles.container}>
      <Text onPress = {goToHomeScreen}  style={styles.backarrow}>
                  ← 
                  </Text>
      <TouchableOpacity
        // onPress={handleSosPress}
        activeOpacity={0.8}
      >
        <Animatable.View
          animation="pulse"
          easing="ease-in-out"
          iterationCount="infinite"
          style={styles.button}
        >
          <Text style={styles.text}>SOS</Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor:'white'
  },
  button: {
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
    backarrow: {
      position: 'absolute',
      top: 40,
      left:20,
      fontSize: 40,
      opacity: 0.6,
      color:'#522D7E'
    },
  });
