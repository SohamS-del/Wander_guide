import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem('userDetails');
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View>
      {userDetails ? (
        <>
          <Text>User Name: {userDetails.name}</Text>
          <Text>Email: {userDetails.email}</Text>
          <Text>Phone: {userDetails.phoneNumber}</Text>
        </>
      ) : (
        <Text style = {styles.txt}>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  txt:{
    color:"#522D7E",
    fontSize:50,
    alignContent:'center'
  }
})
