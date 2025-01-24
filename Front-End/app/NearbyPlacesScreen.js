import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const NearbyPlaces = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);

  const FOURSQUARE_API_KEY = 'fsq3pRYZAOfwaPMBGhjMF+tOzFhhJ3dPzC90WNoAYVKhe2Q=';

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    fetchNearbyPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude);
  };

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.foursquare.com/v3/places/nearby`,
        {
          params: {
            ll: `${latitude},${longitude}`,
            radius: 5000,
            limit: 10,
          },
          headers: {
            Authorization: FOURSQUARE_API_KEY,
          },
          timeout: 10000,
        }
      );
      setPlaces(response.data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
      setErrorMsg('Error fetching places');
    }
  };

  useEffect(() => {
    // Initial location fetch
    requestLocationPermission();

    // Set interval to update location every 30 seconds
    const intervalId = setInterval(async () => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        fetchNearbyPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude);
      } catch (error) {
        console.error('Error updating location:', error);
      }
    }, 30000); // 30 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to render header content (location and button)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {errorMsg ? (
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      ) : location ? (
        <>
          <Text style={styles.locationText}>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
          <TouchableOpacity style={styles.refreshButton} onPress={requestLocationPermission}>
            <Text style={styles.refreshButtonText}>Refresh Location</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Fetching location...</Text>
      )}
    </View>
  );

  // Function to render each place item
  const renderItem = ({ item }) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={styles.placeAddress}>{item.location.address || 'No address available'}</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader} // Attach header
      data={places}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.scrollContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>No nearby places found.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#6200ea',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  locationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  errorMsg: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: '500',
  },
  refreshButton: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  placeItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeAddress: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NearbyPlaces;
