import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Button, TouchableOpacity, TextInput, Image , StatusBar, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { GoogleMapsAPI, GoogleMapsAPIJson } from './components/url';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateJourneyUrl } from './components/url';


const StartJourney = () => {
    const navigation = useNavigation();
    const [travelDirection, setTravelDirection] = useState("from");
    const [travelType, setTravelType] = useState("today");

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [startPoint, setStartPoint] = useState("MIT ADT University");
    const [dropPoint, setDropPoint] = useState("");

    const [userSession, setUserSession] = useState<any>(null);
    const [userId, setUserId] = useState("00000000-0000-0000-0000-000000000000");
    const [userName, setUserName] = useState("");

    const [seatsAvailable, setSeatsAvailable] = useState("");
    const [costPerSeat, setCostPerSeat] = useState("");
    const [startTime, setStartTime] = useState(""); 
    const [isPrivate, setIsPrivate] = useState(false);

    const [startCoords, setStartCoords] = useState({ lat: 0, lng: 0 });
    const [destCoords, setDestCoords] = useState({ lat: 0, lng: 0 });

    


    useEffect(() => {
        getUserData();
        getLocation();
    }, []);
    
    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location permission is required to create a journey.");
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setStartCoords({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
    
            // If going "from" MIT, destination is default (e.g., Pune), otherwise MIT
            if (travelDirection === "from") {
                setDestCoords({
                    lat: 18.5204, // Pune default
                    lng: 73.8567,
                });
            } else {
                setDestCoords({
                    lat: 18.5185, // MIT ADT
                    lng: 73.9197,
                });
            }
        } catch (error) {
            console.error("Error getting location:", error);
            Alert.alert("Error", "Could not retrieve location.");
        }
    };

    const handleselection = (value: string) => {
        setTravelDirection(value);
        if (value === "from") {
            setStartPoint("MIT ADT University");
            setDropPoint("");
            setDestCoords({ lat: 18.5204, lng: 73.8567 }); // Pune
        } else {
            setStartPoint("");
            setDropPoint("MIT ADT University");
            setDestCoords({ lat: 18.5185, lng: 73.9197 }); // MIT
        }
    };
    

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const getUserData = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem("userDetails");
            if (storedUserData) {
                const parsed = JSON.parse(storedUserData);
                setUserSession(parsed);
                setUserId(parsed.userId);
                setUserName(parsed.userName || "Guest");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const createJourney = async () => {
        if (!startTime) {
            Alert.alert("Error", "Please enter a valid start time (HH:mm format).");
            return;
        }

        const [hour, minute] = startTime.split(":").map(Number);
        if (isNaN(hour) || isNaN(minute)) {
            Alert.alert("Error", "Invalid time format. Please use HH:mm.");
            return;
        }

        const journeyData = {
            userId,
            userName: userName,
            journeyCreate: new Date().toISOString().split("T")[0],
            journeyStartDate: date.toISOString().split("T")[0],
            timestamp: new Date().toISOString(),
            fromMit: travelDirection === "from",
            todayOnly: travelType === "today",
            isStarted: false,
            startLatitude: startCoords.lat,
            startLongitude: startCoords.lng,
            startPoint:startPoint,
            destinationLatitude: destCoords.lat,
            destinationLongitude: destCoords.lng,
            dropPoint:dropPoint,
            seatsAvailable: parseInt(seatsAvailable) || 0,
            costPerSeat: parseInt(costPerSeat) || 0,
            journeyStartTime: `${hour}:${minute}`,
            totalSeats: parseInt(seatsAvailable) || 0,
            isPrivate,
        };

        try {
            await AsyncStorage.setItem("journeyData", JSON.stringify(journeyData));
            console.log("Storing Journey Data:", journeyData);

            const response = await fetch(CreateJourneyUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(journeyData),
            });

            const result = await response.json();
            if (response.ok) {
                const journeyId = result.journeyId;
                console.log("Navigating to EmergencyContacts with ID:", journeyId);
                (navigation as any).navigate("EmergencyContacts",{id:journeyId});
            } else {
                Alert.alert("Error", result?.message || "Failed to create journey.");
            }
        } catch (err) {
            console.error("Error creating journey:", err);
            Alert.alert("Error", "Could not create journey.");
        }
    };
    
    
    return(
        <ScrollView style={styles.cont}>
            <StatusBar backgroundColor="#BA2966" barStyle="light-content" />
            <View style={styles.createHeader}>
                <Text style={styles.headerInfo}>Lets create a journey so people can join you
                and get details on what all is there on route! </Text>
            </View>
            <View style={styles.formCont}>
                <View style={styles.form}>
                    <Text style={styles.travelType}>Choose your travel type</Text>
                    <RadioButton.Group
                        onValueChange={handleselection}
                        value={travelDirection}
                    >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton value="from" />
                        <Text style={styles.type}>Travelling from MIT</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton value="to" />
                        <Text style={styles.type}>Travelling towards MIT</Text>
                    </View>
                    </RadioButton.Group>

                    <Text style={styles.actionName}>Starting Point</Text>
                    <TextInput style={styles.input} value={startPoint} onChangeText={(Text) => setStartPoint(Text)} editable={dropPoint == "MIT ADT University"}></TextInput>

                    <Text style={styles.actionName}>Destination/Locality</Text>
                    <TextInput style={styles.input} value={dropPoint} onChangeText={(text) => setDropPoint(text)} editable={startPoint == "MIT ADT University"}></TextInput>

                    <Text style={styles.actionName}>Seats Available</Text>
                    <TextInput style={styles.input} value={seatsAvailable} onChangeText={(text) => setSeatsAvailable(text)} keyboardType="numeric"/> 

                    <Text style={styles.actionName}>Cost per seat</Text>
                    <TextInput style={styles.input} value={costPerSeat} onChangeText={(text) => setCostPerSeat(text)}keyboardType="numeric"/>

                    <Text style={styles.actionName}>Start Time</Text>
                    <TextInput style={styles.input} value={startTime} onChangeText={(text) => setStartTime(text)}/>

                    <Text style={styles.actionName}>Date</Text>
                    

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
                        <Text style={styles.dateTxt}>{date.toDateString()}</Text>
                    </TouchableOpacity>

                    <Text style={styles.travelType}>Select travel type</Text>
                    <RadioButton.Group
                        onValueChange={(text) => setTravelType(text)}
                        value={travelType}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <RadioButton value="today" />
                            <Text style={styles.type}>Today only</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <RadioButton value="everyday" />
                            <Text style={styles.type}>Everyday same time</Text>
                        </View>
                    </RadioButton.Group>
                    <Text style={styles.travelType}>Journey Type</Text>

               <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Checkbox 
                          value={isPrivate} 
                          onValueChange={setIsPrivate} 
                          color={isPrivate ? "#BA2966" : undefined} 
                      />
              <Text style={styles.type}>{isPrivate ? "Private Journey" : "Public Journey"}</Text>
                     </View>


                    <TouchableOpacity onPress={createJourney}>
                    <Text style={styles.create} >CREATE JOURNEY</Text>
                    </TouchableOpacity>
                    


                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    cont:{
        flex: 1
    },
    createHeader:{
        backgroundColor:"#BA2966",
        height:300
    },
    headerInfo:{
        color:"white",
        width:"85%",
        textAlign:"center",
        alignSelf:"center",
        fontSize:18,
        fontWeight:"300",
        marginTop:50
    },
    formCont:{
        height:"auto",
        elevation:5,
        width:"90%",
        marginLeft:"5%",
        backgroundColor:"white",
        borderRadius:25,
        marginTop:-165,
        marginBottom:50
    },
    form:{
        width:"90%",
        marginLeft:"5%",
        height:"auto",
     
    },
    input:{
        backgroundColor:"white",
        borderWidth:2,
        borderColor:"#B7B7B7",
        height:55,
        borderRadius:5,
        elevation:2,
        shadowColor:"#B7B7B7",
        fontSize:16,
        paddingLeft:15,
        marginTop:-8
    },
    travelType:{
        fontSize:20,
        fontWeight:"800",
        color:"#BA2966",
        marginTop:25
    },
    type:{
        color:"#000",
    },
    actionName:{
        fontWeight:"600",
        color:"#BA2966",
        fontSize:14,
        backgroundColor:"white",
        alignItems:"flex-start",
        alignSelf:"flex-start",
        width:"auto",
        marginLeft:10,
        paddingLeft:10,
        paddingRight:10,
        zIndex:5,
        marginTop:20
    },
    create:{
        backgroundColor:"#BA2966",
        textAlign:"center",
        paddingTop:15,
        paddingBottom:15,
        borderRadius:10,
        marginBottom:20,
        color:"white",
        fontSize:16,
        fontWeight:"600",
        marginTop:20,
    },
    date:{

        
        
        paddingLeft:15,
        paddingTop:15,
        paddingBottom:15,
        color:"white",
        marginBottom:15,
        borderRadius: 5,
        
        
        marginTop:-8,
        backgroundColor:"white",
        borderWidth:2,
        borderColor:"#B7B7B7",
    },
    dateTxt:{
        color:"grey",
     
    }
});

export default StartJourney;