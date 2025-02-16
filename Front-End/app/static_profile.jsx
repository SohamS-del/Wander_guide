import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const colleges = ['SOC', 'IOD', 'SOFT', 'SOFA', 'SVS', 'MANET', 'SOE'];

const StaticProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState('SOC');

  const userDetails = {
    name: 'Shravani',
    email: 'shravv@gmail.com',
    phoneNumber: '9284964161',
    carName: 'SV Ranthambore',
    modelDescription:'5 Seats',
    carNumber: 'MH12 SG 1805',
    location: 'Pune, India',
    emergencyContacts: '7385521649, 9876543212',
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need gallery permissions to upload a profile picture!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : null}
            style={styles.profileImage}
          />
          <Text style={styles.uploadText}>Profile Picture</Text>
        </TouchableOpacity>

        <Text style={styles.label}>User Name</Text>
        <TextInput style={styles.input} value={userDetails.name} editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={userDetails.email} editable={false} />

        <Text style={styles.label}>College</Text>
        <Picker
          selectedValue={selectedCollege}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCollege(itemValue)}>
          {colleges.map((college) => (
            <Picker.Item key={college} label={college} value={college} />
          ))}
        </Picker>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={userDetails.phoneNumber} editable={false} />

        <Text style={styles.label}>Car Name</Text>
        <TextInput style={styles.input} value={userDetails.carName} editable={false} />

        <Text style={styles.label}>Model Description</Text>
        <TextInput style={styles.input} value={userDetails.modelDescription} editable={false} />

        <Text style={styles.label}>Car Number</Text>
        <TextInput style={styles.input} value={userDetails.carNumber} editable={false} />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={userDetails.location} editable={false} />

        <Text style={styles.label}>Saved Emergency Contacts</Text>
        <TextInput style={styles.input} value={userDetails.emergencyContacts} editable={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  uploadText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  picker: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default StaticProfileScreen;
