import React from 'react';
import { View, Text, FlatList } from 'react-native';

const SavedContacts = ({ route }:any) => {
  const { contacts } = route.params; // Access contacts passed from the previous screen

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Saved Emergency Contacts
      </Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id || item.name}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: '#f8f9fa',
              marginVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text style={{ fontSize: 14, color: '#6c757d' }}>
                {item.phoneNumbers[0].number}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default SavedContacts;