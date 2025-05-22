import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JourneyDetails = ({ route }: { route: any }) => {
  const { journey } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journey Details</Text>
      {/* <Text style={styles.label}>Driver: <Text style={styles.value}>{journey.driver}</Text></Text>
      <Text style={styles.label}>Route: <Text style={styles.value}>{journey.route}</Text></Text>
      <Text style={styles.label}>Car: <Text style={styles.value}>{journey.car}</Text></Text>
      <Text style={styles.label}>Date: <Text style={styles.value}>{journey.date}</Text></Text>
      <Text style={styles.label}>Time: <Text style={styles.value}>{journey.time}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{journey.status === 1 ? 'Started' : 'Not Started'}</Text></Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  value: {
    fontWeight: '600',
    color: '#007BFF',
  },
});

export default JourneyDetails;
