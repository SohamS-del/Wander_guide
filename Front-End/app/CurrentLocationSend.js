import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CurrentLocationSend = () => {
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      // Get user ID from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem("userDetails");
      if (storedUserDetails) {
        const parsedUserDetails = JSON.parse(storedUserDetails);
        setUserId(parsedUserDetails.userId);
      } else {
        console.error("User details not found in AsyncStorage");
      }

      // Start watching the location
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 5, // Update every 5 meters
        },
        (loc) => {
          console.log("Updated Location:", loc.coords.latitude, loc.coords.longitude);
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });

          sendLocationToBackend(loc.coords.latitude, loc.coords.longitude);
        }
      );
    };

    fetchLocation();
  }, []);

  const sendLocationToBackend = async (latitude, longitude) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await fetch(locationUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          UserId: userId,
          Latitude: latitude,
          Longitude: longitude,
          Timestamp: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      console.log("Location sent to backend:", data);
    } catch (error) {
      console.error("Error sending location to backend:", error);
    }
  };

  return (
    <MapView
      provider="google"
      style={styles.map}
      region={
        location && {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      }
    >
      {location && <Marker coordinate={location} title="Your Location" />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CurrentLocationSend;
