import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoutesUrl } from './components/url';

interface Journey {
  id: string;
  route: string;
  time: string;
}

const EverydayRoutes = ({ navigation }: { navigation: any }) => {
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
      fetchJourneys(User.userId);
    }
  }, [User.userId]);

  const fetchJourneys = async (currentUserId: string) => {
    setLoading(true);
    try {
      const response = await fetch(RoutesUrl);
      const data = await response.json();

      if (response.ok) {
        const filteredJourneys = data.filter(
          (journey: { isPrivate: boolean; userId: string }) => !journey.isPrivate && journey.userId !== currentUserId
        );

        await AsyncStorage.setItem('journeys', JSON.stringify(filteredJourneys));
        setJourney(filteredJourneys);
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

  const seeDetails = () => {
   
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const renderRouteCard = ({ item }: any) => {
    const routeParts = item.route?.split('→') || [];
    const start = routeParts[0]?.trim() || 'Unknown';
    const end = routeParts[1]?.trim() || 'Unknown';

    return (
      <View style={styles.card}>
        <Text style={styles.driverName}>{item.driver}</Text>
        <Text style={styles.route}>
          <Text style={styles.routeHighlight}>{start}</Text> →{' '}
          <Text style={styles.routeHighlight}>{end}</Text>
        </Text>
        <Text style={item.status === 1 ? styles.rideStatus : styles.rideStatusOff}>
          {item.status === 1 ? "started" : "not started"}
        </Text>
        <Text style={styles.details}>
          {item.car} | {item.date} | {item.time}
        </Text>
        <TouchableOpacity style={styles.bookButton} onPress={seeDetails}>
          <Text style={styles.bookButtonText}>see details</Text>
        </TouchableOpacity>
      </View>
    );
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

      <TouchableOpacity style={styles.findButton} onPress={seeDetails}>
        <Text style={styles.findButtonText}>find available cars</Text>
      </TouchableOpacity>

      <FlatList
        data={journey}
        keyExtractor={(item) => item.id}
        renderItem={renderRouteCard}
        contentContainerStyle={styles.list}
      />
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
