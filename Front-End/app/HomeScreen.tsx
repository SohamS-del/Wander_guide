import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useCallback, useContext } from 'react'; // ✅ Added useCallback for optimization
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { logout } = useContext(AuthContext); 
  // ✅ Renamed conflicting function `StartJourney` to `handleStartJourney`
  const handleStartJourney = useCallback(() => {
    navigation.navigate("StartJourney");
  }, [navigation]);

  const handleLogout = useCallback(() => {
    logout();
    navigation.navigate("login"); // ✅ Added dedicated logout function
  }, [navigation, logout]);

  const menuItems = [
    { label: "Pool Car", action: "EverydayRoutes" },
    { label: "Start Journey", action: "StartJourney" },
    { label: "Home", action: "NearbyPlaces" },
    { label: "My Account", action: "StaticProfileScreen" },
    { label: "My Emergency Contacts", action: "EmergencyContacts" },
    { label: "SOS", action: "Login" }, // ✅ Kept navigation to Login for SOS as per original code
    { label: "My Location", action: "CurrentLocationSend" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#BA2966" barStyle="light-content" />
      <Text style={styles.manageAccount}>Manage your account</Text>

      {menuItems.map((item, index) => (
        <Text key={index} style={styles.goback} onPress={() => navigation.navigate(item.action)}>
          {item.label}
        </Text>
      ))}
      
      <Text onPress={handleLogout} style={styles.goback}>LOGOUT</Text> {/* ✅ Used dedicated logout function */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginLeft: "5%",
  },
  manageAccount: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 30,
    color: '#BA2966',
  },
  goback: {
    fontSize: 18,
    textAlign: "left",
    backgroundColor: "white",
    marginTop: 20,
    padding: 18,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#BA2999",
  },
});
