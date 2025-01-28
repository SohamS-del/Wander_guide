import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const EverydayRoutes = () => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');

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
      <TextInput
        style={styles.input}
        placeholder="Search starting point"
        value={startingPoint}
        onChangeText={setStartingPoint}
      />
      <TextInput
        style={styles.input}
        placeholder="Search Destination"
        value={destination}
        onChangeText={setDestination}
      />
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
});

export default EverydayRoutes;