import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const NearbyPlacesScreen = () => {
  const [location, setLocation] = useState(null);
  const Name = "Soham";
  const Phone = 8530804663;
  const UserId = 1201;
  const Id = 1001;

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Send location to backend every minute
      const interval = setInterval(() => {
        sendLocationToBackend(location.coords.latitude, location.coords.longitude);
      }, 60000); // Send every 60 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    };

    fetchLocation();
  }, []);

  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      const response = await fetch('locationUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id:0,
          UserId:123,
          Name:'soham',
          Phone:865202222,
          Email:"kachingjutsu@gmail.com",
          Latitude: latitude,
          Longitude : longitude,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      console.log('Location sent to backend:', data);
    } catch (error) {
      console.error('Error sending location to backend:', error);
    }
  };

  if (!location) return null;

  return (
    <MapView
      provider="google"
      style={styles.map}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker coordinate={location} title="Your Location" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default NearbyPlacesScreen;
