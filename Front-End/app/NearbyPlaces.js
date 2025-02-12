import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { GoogleMapsAPI, GoogleMapsAPIJson } from './components/url';

const NearbyPlaces = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  const navigation = useNavigation();

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      fetchNearbyPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude);
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setErrorMsg('Unable to retrieve location.');
    }
  };

  const menuPress = () =>{
    navigation.navigate("HomeScreen")
  }

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
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
      console.error('Error fetching places:', error);
      setErrorMsg('Error fetching nearby places.');
    }
  };

  useEffect(() => {
    requestLocationPermission();

    const intervalId = setInterval(async () => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        fetchNearbyPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude);
      } catch (error) {
        console.error('Error updating location:', error);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={styles.placeAddress}>{item.vicinity || 'No address available'}</Text>
    </View>
  );

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const placesToShow = collapsed ? filteredPlaces.slice(0, 5) : filteredPlaces;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <TouchableOpacity style={styles.menu} onPress={menuPress}>
          <Image source={require('./assets/menu.png')} style={styles.menuIcon}  />
        </TouchableOpacity>
      
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.welcomeName}>Soham</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('FullListPage', { places: filteredPlaces })}>
          {/* <Text style={styles.viewAll}>View all</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.cont}>
          <View style={styles.myJourneyCard}>
            <View style={styles.myJourneyCardCont}> 
            <Text style={styles.myJourneyDate}>19th Feb 2025 | 2pm</Text>  
            <Text style={styles.myJourneyHeading}>HEADING TOWARDS</Text>        
              <Text style={styles.myJourneyDestination}>Shop No 1 Gulmohor Regency, Symbiosis College Road, Viman Nagar, Pune - 411014</Text>
              
              <Text style={1==1 ?styles.started : styles.notStarted}>{1==1 ? "started" : "not started"}</Text>
            </View>              
          </View>
      </View>


      <View style={styles.listHeader}>
        <Text style={styles.listHeading}>People who added me</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullListPage', { places: filteredPlaces })}>
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

      

      <View style={styles.listHeader}>
        <Text style={styles.listHeading}>Places within 10kms</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullListPage', { places: filteredPlaces })}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search places"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={placesToShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No nearby places found.</Text>}
      />
      {collapsed && filteredPlaces.length > 5 && (
        <TouchableOpacity style={styles.showMore} onPress={() => setCollapsed(false)}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      )}
      
    </ScrollView>
  );
};

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
  }
});

export default NearbyPlaces;
