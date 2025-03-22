import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, renderItem, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { GoogleMapsAPI, GoogleMapsAPIJson } from './components/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NearbyPlaces = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [journeyDetails, setJourneyDetails] = useState(null);
  const navigation = useNavigation();
  const [userSession, setUserSession] = useState(null); // Store user session
  const [userName, setUserName] = useState('Guest');
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuPress = (navigation) => {
    navigation.navigate('HomeScreen');
  };

  // useEffect to fetch user data and request location permission on mount
  useEffect(() => {
    getUserData();
    requestLocationPermission();
    getJourneyData();
  }, []);

      // Function to fetch journey data from AsyncStorage
      const getJourneyData = async () => {
        try {
            const storedData = await AsyncStorage.getItem("journeyData");
            if (storedData) {
                setJourneyData(JSON.parse(storedData));
            } else {
                console.log("No Journey Data Found.");
            }
        } catch (error) {
            console.error("Error retrieving journey data:", error);
        } finally {
            setLoading(false);
        }
    };
  // Function to fetch user data from AsyncStorage
  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userDetails');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log('User Data:', parsedUserData);
        setUserSession(parsedUserData); // Store parsed user data in state
        setUserName(parsedUserData.name || 'Guest');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Request Location Permission & Fetch Nearby Places
  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 5000,
      });

      setLocation(currentLocation);
      fetchNearbyPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Unable to retrieve location.');
    }
  }, []);

  // Fetch nearby places from Google Maps API
  const fetchNearbyPlaces = async (latitude, longitude) => {
    if (!latitude || !longitude) return;

    if (location &&
        Math.abs(location.coords.latitude - latitude) < 0.0001 &&
        Math.abs(location.coords.longitude - longitude) < 0.0001) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(GoogleMapsAPIJson, {
        params: {
          location: `${latitude},${longitude}`,
          radius: 5000,
          key: GoogleMapsAPI,
        },
        timeout: 10000,
      });
      setPlaces(response.data.results);
    } catch (error) {
      setErrorMsg(error.code === 'ECONNABORTED' ? 'Request timed out. Try again.' : 'Error fetching nearby places.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Journey Details
  const fetchJourneyDetails = async () => {
    try {
      if (!userSession || !userSession.userId) {
        console.error("Error: userId is undefined.");
        return;
      }
      setLoading(true);

      const serverUrl = 'http://localhost:7209/api/JourneyLookup/user';
      const response = await axios.get(`${serverUrl}/${userSession.userId}`);

      setJourneyDetails(response.data);
    } catch (error) {
      console.error('Error fetching journey details:', error);
      setErrorMsg('Error fetching journey details.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch journey details when userSession is set
  useEffect(() => {
    if (userSession) {
      fetchJourneyDetails();
    }
  }, [userSession]); // Depend on userSession

  // Periodic location updates every 60 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        fetchNearbyPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude);
      } catch (error) {
        console.error('Error updating location:', error);
        setErrorMsg('Failed to update location.');
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

//FlatList
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <TouchableOpacity style={styles.menu} onPress={()=>navigation.navigate("HomeScreen")}>
          <Image source={require('./assets/menu.png')} style={styles.menuIcon}  />
        </TouchableOpacity>
      
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.welcomeName}>{userName}</Text>


      </View>
      
      <View style={styles.header}>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.boxTitle}>So where are you heading?</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('StartJourney')}
              > 
                <Text style={styles.buttonText}>Let’s start a journey</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('./assets/loc.png')} style={styles.boxImage} />
          </View>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.boxTitle}>Pool a car on your way</Text>
              <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("EverydayRoutes")}>
                <Text style={styles.buttonText}>Check Cars</Text>
              </TouchableOpacity>
            </View>
            <Image source={require('./assets/pool.png')} style={styles.boxImage} />
          </View>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listHeading}>My journey</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullListPage')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cont}>
  <View style={styles.myJourneyCard}>
    <View style={styles.myJourneyCardCont}> 
      <Text style={styles.myJourneyDate}>
        {journeyData?.date || "Journey Create Date not available"} | 
        {journeyData?.startTime || "Start Time not available"}
      </Text>  
      <Text style={styles.myJourneyHeading}>HEADING TOWARDS</Text>        
     
      
      {journeyDetails && (
  <Text style={journeyDetails.isStarted ? styles.started : styles.notStarted}>
    {journeyDetails.isStarted ? "Started" : "Not Started"}
  </Text>
)}

{journeyData ? (
                <View>
                    <Text style={styles.label}>Direction: <Text style={styles.value}>{journeyData.travelDirection}</Text></Text>
                    <Text style={styles.label}>Start Point: <Text style={styles.value}>{journeyData.startPoint}</Text></Text>
                    <Text style={styles.label}>Drop Point: <Text style={styles.value}>{journeyData.dropPoint}</Text></Text>
                    <Text style={styles.label}>Seats Available: <Text style={styles.value}>{journeyData.seatsAvailable}</Text></Text>
                    <Text style={styles.label}>Cost Per Seat: <Text style={styles.value}>{journeyData.costPerSeat}</Text></Text>
                    <Text style={styles.label}>Travel Type: <Text style={styles.value}>{journeyData.travelType}</Text></Text>
                    <Text style={styles.label}>Private Journey: <Text style={styles.value}>{journeyData.isPrivate ? "Yes" : "No"}</Text></Text>
                </View>
            ) : (
                <Text style={styles.noData}>No journey data available.</Text>
            )}
    </View>              
  </View>

</View>



      <View style={styles.listHeader}>
        <Text style={styles.listHeading}>People who added me</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullListPage')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cont}>
        <TouchableOpacity>
          <View style={styles.addedMeCard}>
              <View style={styles.addedMeCardCont}>          
                <Text style={styles.addedName}>Himanshu Phalke</Text>
                <Text style={styles.addedJourney}><Text style={styles.to}>Heading towards MIT ADT University Loni Kalbhor on </Text>19th Feb 2025 </Text>
                <Text style={1==2 ?styles.started : styles.notStarted}>{1==2 ? "started" : "not started"}</Text>
              </View>              
            </View>
        </TouchableOpacity>          
      </View>

      {/* filteredPlaces */}

      <View style={styles.listHeader}>
        <Text style={styles.listHeading}>Places within 10kms</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullListPage')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search places"
        value={searchQuery || ""}
        onChangeText={setSearchQuery}
      />
     {loading ? (
  <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
) : (
  <FlatList
  //  data={placesToShow}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
    contentContainerStyle={styles.scrollContainer}
    ListEmptyComponent={<Text style={styles.emptyText}>No nearby places found.</Text>}
  />
)}
      {/* {collapsed && filteredPlaces.length > 5 && (
        <TouchableOpacity style={styles.showMore} onPress={() => setCollapsed(false)}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      )} */}
      
    </ScrollView>
  );
};
//Image
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    padding: 20,
    // backgroundColor: '#ADD8E6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menu:{
    position:"absolute",
    marginTop:12,
    alignSelf:"flex-end",
    zIndex: 10,
    
  },
  menuIcon:{
    height:31,
    width:35,
    marginRight:"7%",
  },
  welcome:{
    paddingLeft:20,
    marginTop:20
  },
  welcomeText:{
    fontSize:22,
    color:"#007BFF"
  },
  welcomeName:{
    fontSize:26,
    fontWeight:"bold",
    color:"#007BFF",
    marginTop:"-5"
  },
  boxContainer: { marginBottom: 20 },
  box: {
    flexDirection: 'row',
    backgroundColor: '#BA2966',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  boxContent: { flex: 1 },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 5,
    width:"70%"
  },
  cont:{
    width:"90%",
    marginLeft:"5%",
    marginBottom:20,
    marginTop:-15
  },
  buttonText: { color: '#BA2966', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  listHeading: { fontSize: 20, fontWeight: 'bold', color: '#007BFF' },
  viewAll: { color: '#007BFF', fontSize: 16, fontWeight: '600',textDecorationLine:"underline" },
  searchBar: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 ,borderRadius: 15,height:"auto",backgroundColor:"#EEEEEE",width:"90%",marginLeft:"5%"},
  placeItem: {
    backgroundColor: '#EEEEEE',
    paddingTop: 20,
    paddingBottom:12.5,
    marginBottom: 12.5,
    // borderRadius: 7,
    // elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderBottomColor:"black",
    borderBottomWidth:1,
    borderBottomColor:"#CCCCCC"
  },
  placeName: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#007BFF',textDecorationLine:"underline" },
  placeAddress: { fontSize: 14, color: '#BA2966' },
  emptyText: { fontSize: 18, color: '#007BFF', textAlign: 'center', marginTop: 20 },
  showMore: { alignItems: 'center', marginVertical: 10 },
  showMoreText: { fontSize: 16, color: '#007BFF', fontWeight: '600' },
  addedMe:{
    fontSize:20,
    fontWeight:"800",
    color:"#595959"
  },
  addedMeCard:{
    height:"auto",
    backgroundColor:"#EEEEEE",
    borderRadius:10,
    marginTop:15,
    // borderWidth:1.5,
    // borderColor:"#BFBFBF"
  },
  addedMeCardCont:{
    width:"90%",
    marginLeft:"5%",
    marginTop:15,
    marginBottom:15
  },
  addedName:{
    fontSize:19,
    fontWeight:"600",
    color:"#BA2966"
  },
  addedJourney:{
    color:"#007BFF",
    fontSize:14,
    fontWeight:"600",
    marginTop:10
  },
  to:{
    color:"black",
    fontWeight:"400"
  },
  started:{
    backgroundColor:"green",
    alignSelf:"flex-start",
    paddingLeft:10,paddingRight:10,
    paddingBottom:2,
    borderRadius:20,
    color:"white",
    marginTop:10
  },
  notStarted:{
    backgroundColor:"#5D5D5D",
    alignSelf:"flex-start",
    paddingLeft:10,paddingRight:10,
    paddingBottom:2,
    borderRadius:20,
    color:"white",
    marginTop:10
  },
  myJourneyCard:{
    height:"auto",
    backgroundColor:"white",
    borderRadius:10,
    marginTop:15,
     borderWidth:1.5,
    borderColor:"#BFBFBF"
  },
  myJourneyCardCont:{
    width:"90%",
    marginLeft:"5%",
    marginTop:15,
    marginBottom:15
  },
  myJourneyDate:{
    color:"#0085FF",
    fontSize:14,
    fontWeight:"600",

  },
  myJourneyDestination:{
    fontSize:16,
    
    color:"#5D5D5D",

  },
  myJourneyHeading:{
    marginTop:10,
    color:"#BA2966",
    fontWeight:800,
  },
  journeyDetailText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50', // Or any color you prefer
  },
});

export default NearbyPlaces;
