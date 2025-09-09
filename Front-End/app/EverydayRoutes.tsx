import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoutesUrl } from './components/url';

interface Journey {
  journeyId: string;
  userName: string;
  userId: string;
  journeyCreate: string;
  journeyStartDate: string;
  timestamp: string;
  fromMit: boolean;
  todayOnly: boolean;
  isStarted: boolean;
  startLatitude: number;
  startLongitude: number;
  startPoint: string;
  destinationLatitude: number;
  destinationLongitude: number;
  dropPoint: string;
  seatsAvailable: number;
  costPerSeat: number;
  journeyStartTime: string | null;
  totalSeats: number;
  isPrivate: boolean;
}

const EverydayRoutes = ({ navigation, route }: { navigation: any; route: any }) => {

  const [journey, setJourney] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(false);
  const [travelDirection, setTravelDirection] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [User, setUser] = useState({ userId: '', name: '' });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userDetails');
        if (jsonValue !== null) {
          const { userId, name } = JSON.parse(jsonValue);
          setUser({ userId, name });
        }
      } catch (error) {
        console.error('Error reading user details', error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (User.userId) {
      fetchJourneys();
    }
  }, [User.userId]);

  const fetchJourneys = async () => {
    setLoading(true);
    try {
      const response = await fetch(RoutesUrl);
      const data = await response.json();

      if (response.ok) {
        const publicJourneys = data.filter(
          (j: Journey) => !j.isPrivate
        );

        await AsyncStorage.setItem('journeys', JSON.stringify(publicJourneys));
        setJourney(publicJourneys);
      } else {
        console.error('Failed to fetch journeys:', data);
      }
    } catch (error) {
      console.error('Error fetching journeys:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadJourneysFromStorage = async () => {
    try {
      const storedJourneys = await AsyncStorage.getItem('journeys');
      if (storedJourneys) {
        setJourney(JSON.parse(storedJourneys));
      }
    } catch (error) {
      console.error('Error loading journeys from storage:', error);
    }
  };

  useEffect(() => {
    loadJourneysFromStorage();
  }, []);

  const handleselection = (value: string) => {
    setTravelDirection(value);
    if (value === "from") {
      setStartingPoint("MIT ADT University");
      setDestination("");
    } else {
      setStartingPoint("");
      setDestination("MIT ADT University");
    }
  };

  const seeDetails = (journey: Journey) => {
    navigation.navigate('JourneyDetails', { journey });
  };
  

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const renderRouteCard = ({ item }: { item: Journey }) => {

    return (
      <View style={styles.card}>
        <Text style={styles.driverName}>{User.name}</Text>
        <Text style={styles.route}>
          <Text style={styles.routeHighlight}>{item.startPoint}</Text> →{' '}
          <Text style={styles.routeHighlight}>{item.dropPoint}</Text>
        </Text>
        <Text style={item.isStarted === true ? styles.rideStatus : styles.rideStatusOff}>
          {item.isStarted === true ? "started" : "not started"}
        </Text>
        <Text style={styles.details}>
          {item.userName} |  {item.journeyStartDate} | {item.journeyStartTime}
        </Text>
        <TouchableOpacity style={styles.bookButton} onPress={() => seeDetails(item)}>
          <Text style={styles.bookButtonText}>see details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) return null;
    return <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No journeys available</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>See everyday routes</Text>
      <RadioButton.Group onValueChange={handleselection} value={travelDirection}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <RadioButton value="from" />
          <Text>From MIT</Text>
          <RadioButton value="to" />
          <Text>Towards MIT</Text>
        </View>
      </RadioButton.Group>

      <TextInput
        style={styles.input}
        placeholder="Search starting point"
        value={startingPoint}
        onChangeText={setStartingPoint}
        editable={destination === "MIT ADT University"}
      />
      <TextInput
        style={styles.input}
        placeholder="Search Destination"
        value={destination}
        onChangeText={setDestination}
        editable={startingPoint === "MIT ADT University"}
      />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.date}>
        <Text style={styles.dateTxt}>Select date: {date.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.findButton} >
        <Text style={styles.findButtonText}>find available cars</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={journey}
          keyExtractor={(item) => item.journeyId}
          renderItem={renderRouteCard}
          contentContainerStyle={styles.list}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  findButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  findButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  route: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666666',
  },
  routeHighlight: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  details: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#333333',
    paddingVertical: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  date: {
    backgroundColor: '#F7F7F7',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    color: "white",
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateTxt: {
    color: "grey",
  },
  rideStatus: {
    color: "white",
    alignSelf: "flex-start",
    backgroundColor: "green",
    paddingLeft: 10,
    borderRadius: 15,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10
  },
  rideStatusOff: {
    color: "white",
    paddingLeft: 10,
    borderRadius: 15,
    paddingRight: 10,
    paddingBottom: 2,
    alignSelf: "flex-start",
    backgroundColor: "grey",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10
  }
});

export default EverydayRoutes;
