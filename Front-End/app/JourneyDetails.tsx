import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const JourneyDetails = ({ route }: any) => {
  const { journey } = route.params;
  const [contactInfo, setContactInfo] = useState<{ name: string; contact: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`https://localhost:7209/api/JourneyLookup/user/${journey.userId}`);
        const data = await response.json();

        if (response.ok) {
          setContactInfo({ name: data.name, contact: data.contact });
        } else {
          console.error('Failed to fetch contact info');
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [journey.userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!contactInfo) {
    return (
      <View style={styles.centered}>
        <Text>Failed to load contact information.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.userName}>{contactInfo.name}</Text>
      <View style={styles.greenBox}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{formatDate(journey.journeyStartDate)}</Text>

        <Text style={styles.label}>Contact number</Text>
        <Text style={styles.contact}>{contactInfo.contact}</Text>
      </View>

      <View style={styles.grayBox}>
        <Text style={styles.locationTitle}>{journey.startPoint}</Text>
        <Text style={styles.startTime}>Starts at {formatTime(journey.journeyStartTime)}</Text>
        <Text style={styles.address}>
          {journey.dropPoint}
        </Text>
        <View style={styles.withYouButton}>
          <Text style={styles.buttonText}>With you</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Utility Functions
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
    gap: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  greenBox: {
    backgroundColor: '#1abc1a',
    borderRadius: 10,
    padding: 15,
  },
  label: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  contact: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  grayBox: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 20,
  },
  locationTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startTime: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  address: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 16,
  },
  withYouButton: {
    backgroundColor: '#1abc1a',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JourneyDetails;
