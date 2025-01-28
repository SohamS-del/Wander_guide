import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  EmergencyContacts: undefined;
  SavedContacts: { contacts: Contacts.Contact[] };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EmergencyContacts'>;

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [userDetails, setUserDetails] = useState<any>(null); // Store user details including userId

  // Fetch user details from AsyncStorage
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem('userDetails');
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetail();
  }, []);

  const saveContactsToBackend = async () => {
    if (!userDetails) {
      console.error('User details are null or undefined');
      Alert.alert('Error', 'Failed to fetch user details.');
      return;
    }

    const userId = userDetails.userId; // Assuming userDetails contains userId

    if (selectedContacts.length !== 3) {
      Alert.alert('Error', 'Please select exactly 3 emergency contacts.');
      return;
    }

    const getPhoneNumber = (contact: Contacts.Contact) => {
      const phone = contact?.phoneNumbers?.[0]?.number || ''; // Fallback to empty string
      return phone;
    };

    const payload = {
      userId: userId, // Add userId to the payload
      emergencyPhone1: getPhoneNumber(selectedContacts[0]),
      emergencyPhone2: getPhoneNumber(selectedContacts[1]),
      emergencyPhone3: getPhoneNumber(selectedContacts[2]),
    };

    try {
      const response = await fetch('http://your-backend-url/api/EmergencyContacts/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Failed to save contacts.');
      }
    } catch (error) {
      console.error('Error saving contacts:', error);
      Alert.alert('Error', 'Failed to save contacts.');
    }
  };

  // Request permissions and fetch contacts
  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const filteredContacts = data.filter(
          (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0 && contact.id
        );
        setContacts(filteredContacts);
      } else {
        Alert.alert('No contacts found.');
      }
    } else {
      Alert.alert('Permission denied to access contacts.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSelectContact = (contact: Contacts.Contact) => {
    if (selectedContacts.length >= 3 && !selectedContacts.find((c) => c.id === contact.id)) {
      Alert.alert('You can only select up to 3 emergency contacts.');
      return;
    }

    if (selectedContacts.find((c) => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Select Emergency Contacts (Max 3)
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search Contacts"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id || item.name}
        renderItem={({ item }) => {
          const isSelected = selectedContacts.some((c) => c.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => handleSelectContact(item)}
              style={[
                styles.contactItem,
                { backgroundColor: isSelected ? '#d1e7dd' : '#f8f9fa' },
              ]}
            >
              <Checkbox
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => handleSelectContact(item)}
              />
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                  <Text style={styles.contactPhone}>
                    {item.phoneNumbers[0].number}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={saveContactsToBackend}
        style={[styles.saveButton, { backgroundColor: isSaved ? '#28a745' : '#007bff' }]}
        disabled={isSaved}
      >
        <Text style={styles.saveButtonText}>
          {isSaved ? 'Emergency Contacts Saved' : 'Save Emergency Contacts'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  contactInfo: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 14,
    color: '#6c757d',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EmergencyContacts;
