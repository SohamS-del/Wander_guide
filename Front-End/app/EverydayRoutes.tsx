import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";

const EverydayRoutes = () => {
  const [startingPoint, setStartingPoint] = useState('MIT ADT University');
  const [destination, setDestination] = useState('');

  const [date, setDate] = useState(new Date());
      const [showPicker, setShowPicker] = useState(false);

  const[travelDirection,setTravelDirection] = useState("from");
      
  const handleselection = (value:string) =>{
    setTravelDirection(value);
    if (value === "from") {
      setStartingPoint("MIT ADT University");
      setDestination(""); // Reset Drop Point for user input
    } else {
      setStartingPoint(""); // Reset Starting Point for user input
      setDestination("MIT ADT University");
    }
  
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Hide picker after selection
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const routes = [
    {
      id: '1',
      driver: 'Shravani',
      route: 'MIT-ADT → Katraj',
      car: 'Mercedes G-Wagon',
      date: '27th January 2025',
      time: '4:45 pm',
    },
    {
      id: '2',
      driver: 'Soham',
      route: 'MIT-ADT → Katraj',
      car: 'Lexus',
      date: '27th January 2025',
      time: '4:45 pm',
    },
    {
      id: '3',
      driver: 'Vedant',
      route: 'MIT-ADT → Katraj',
      car: 'BMW M2',
      date: '27th January 2025',
      time: '4:45 pm',
    },
    {
      id: '4',
      driver: 'Kang',
      route: 'MIT-ADT → Hadapsar',
      car: 'Range Rover SV Ranthambore',
      date: '27th January 2025',
      time: '4:45 pm',
    },
  ];

  const renderRouteCard = ({ item }:any) => (
    <View style={styles.card}>
      <Text style={styles.driverName}>{item.driver}</Text>
      <Text style={styles.route}>
        <Text style={styles.routeHighlight}>{item.route.split('→')[0].trim()}</Text> →{' '}
        <Text style={styles.routeHighlight}>{item.route.split('→')[1].trim()}</Text>
      </Text>
      <Text style={styles.details}>
        {item.car} | {item.date} | {item.time}
      </Text>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>book a seat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>See everyday routes</Text>
      <RadioButton.Group
          onValueChange={handleselection}
          value={travelDirection}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom:10 }}>
          <RadioButton value="from" />
          <Text >From MIT</Text>
          <RadioButton value="to" />
          <Text >Towards MIT</Text>
          </View>
      </RadioButton.Group>

      <TextInput
        style={styles.input}
        placeholder="Search starting point"
        value={startingPoint}
        onChangeText={setStartingPoint}
        editable={destination=="MIT ADT University"}
      />
      <TextInput
        style={styles.input}
        placeholder="Search Destination"
        value={destination}
        onChangeText={setDestination}
        editable={startingPoint=="MIT ADT University"}
      />

{/* <TextInput
        style={styles.input}
        placeholder="Search Destination"
        value={destination}
        onChangeText={setDestination}
      /> */}

      {/* Show Picker for Android & iOS */}
      {showPicker && (
                        <DateTimePicker
                        value={date}
                        mode="date"
                        
                        onChange={handleDateChange}
                        />
                    )}

                    {/* Open Date Picker */}
                    
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.date}>
                        <Text style={styles.dateTxt}>Select date: {date.toDateString()}</Text>
                    </TouchableOpacity>
      
      <TouchableOpacity style={styles.findButton}>
        <Text style={styles.findButtonText}>find available cars</Text>
      </TouchableOpacity>
      <FlatList
        data={routes}
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
  date:{

    backgroundColor: '#F7F7F7',
    marginTop:0,
    paddingLeft:15,
    paddingTop:15,
    paddingBottom:15,
    color:"white",
    marginBottom:15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
},
dateTxt:{
    color:"grey",
 
}
});

export default EverydayRoutes;