// import React, { useEffect, useState } from 'react';
// import { StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// const CurrentLocationSend = () => {
//   const [location, setLocation] = useState(null);
//   const [userId, setUserId] = useState<string | null>(null); // state to hold userId

//   useEffect(() => {
//     const fetchLocation = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Location permission denied');
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });
//       setLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });

//       // Get userId from AsyncStorage (or context if needed)
//       const storedUserDetails = await AsyncStorage.getItem('userDetails');
//       if (storedUserDetails) {
//         const parsedUserDetails = JSON.parse(storedUserDetails);
//         setUserId(parsedUserDetails.userId); // Set the userId from AsyncStorage
//       } else {
//         console.error('User details not found in AsyncStorage');
//       }

//       // Send location to backend every minute
//       const interval = setInterval(async () => {
//         const updatedLocation = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setLocation({
//           latitude: updatedLocation.coords.latitude,
//           longitude: updatedLocation.coords.longitude,
//         });
//         sendLocationToBackend(
//           updatedLocation.coords.latitude,
//           updatedLocation.coords.longitude
//         );
//       }, 60000); // Send every 60 seconds

//       return () => clearInterval(interval); // Cleanup on unmount
//     };

//     fetchLocation();
//   }, []);

//   const sendLocationToBackend = async (latitude, longitude) => {
//     if (!userId) {
//       console.error('User ID is missing');
//       return;
//     }

//     try {
//       const response = await fetch(locationUrl, {
//         method: 'PUT', // Changed to PUT
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': 'true',
//         },
//         body: JSON.stringify({
//           UserId: userId, // Use dynamic userId from AsyncStorage
//           Latitude: latitude,
//           Longitude: longitude,
//           Timestamp: new Date().toISOString(), // Ensure proper casing
//         }),
//       });
//       const data = await response.json();
//       console.log('Location sent to backend:', data);
//     } catch (error) {
//       console.error('Error sending location to backend:', error);
//     }
//   };

//   if (!location || !userId) return null;

//   return (
//     <MapView
//       provider={Platform.OS === 'android' ? "google" : undefined}
//       style={styles.map}
//       region={{
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}>
//       <Marker coordinate={location} title="Your Location" />
//     </MapView>
    
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default CurrentLocationSend;