import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FullListPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { places }:any = route.params || {}; // Retrieve the places passed from NearbyPlaces
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPlaces = places.filter((place: { name: string; }) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }:any) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={styles.placeAddress}>{item.vicinity || 'No address available'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Nearby Places</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search places"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No places match your search.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#522D7E',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { padding: 10, backgroundColor: '#ffffff', borderRadius: 5, marginRight: 10 },
  backButtonText: { color: '#522D7E', fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  searchBar: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 25,
    margin: 15,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  placeItem: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    // elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  placeName: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333333',textDecorationLine:"underline" },
  placeAddress: { fontSize: 14, color: '#666666' },
  emptyText: { fontSize: 18, color: '#999999', textAlign: 'center', marginTop: 20 },
});

export default FullListPage;