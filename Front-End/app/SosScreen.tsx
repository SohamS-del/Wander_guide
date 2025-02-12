import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SosScreen: undefined;
  HomeScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SosScreen">;

const SosScreen: React.FC<Props> = ({ navigation }) => {
  const [pressTimes, setPressTimes] = useState<number[]>([]);
  const MAX_SPAM_COUNT = 6;
  const SPAM_INTERVAL = 10000;

  const handleSosPress = () => {
    try {
      const currentTime = Date.now();
      setPressTimes((prevPressTimes) => {
        const updatedPressTimes = [...prevPressTimes, currentTime].filter(
          (time) => currentTime - time <= SPAM_INTERVAL
        );
        if (updatedPressTimes.length >= MAX_SPAM_COUNT) {
          Alert.alert('🚨 SOS Alert', 'SOS message has been sent!');
          return [];
        }
        return updatedPressTimes;
      });
    } catch (error) {
      console.error('Error handling SOS button press:', error);
    }
  };

  const goToHomeScreen = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text onPress={goToHomeScreen} style={styles.backarrow}>←</Text>
      <Text style={styles.heading}>Emergency Assistance</Text>
      <Text style={styles.description}>Tap the SOS button 5 times within 10 seconds to send an alert.</Text>
      <TouchableOpacity onPress={handleSosPress} activeOpacity={0.8}>
        <Animatable.View animation="pulse" easing="ease-in-out" iterationCount="infinite" style={styles.button}>
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
    backgroundColor: 'black'
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  backarrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 40,
    opacity: 0.8,
    color: '#fff',
  },
});
