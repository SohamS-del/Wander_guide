import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Button, TouchableOpacity, TextInput, Image , StatusBar, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { GoogleMapsAPI, GoogleMapsAPIJson } from './components/url';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';
import DateTimePicker from "@react-native-community/datetimepicker";

const StartJourney =()=>{
    const[travelDirection,setTravelDirection] = useState("from");
    const[travelType, setTravelType] = useState("today")

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const[startPoint, setStartPoint] = useState("MIT ADT University");
    const[dropPoint, setDropPoint] = useState("");

    const handleselection = (value:string) =>{

        setTravelDirection(value);
        if (value === "from") {
            setStartPoint("MIT ADT University");
            setDropPoint(""); // Reset Drop Point for user input
          } else {
            setStartPoint(""); // Reset Starting Point for user input
            setDropPoint("MIT ADT University");
          }

    };
    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false); // Hide picker after selection
        if (selectedDate) {
          setDate(selectedDate);
        }
      };
    const createJourney = () =>{
        console.log("Created")
    }
    return(
        <ScrollView style={styles.cont}>
            <StatusBar backgroundColor="#5D5D5D" barStyle="light-content" />
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
                    <TextInput style={styles.input}></TextInput>

                    <Text style={styles.actionName}>Cost per seat</Text>
                    <TextInput style={styles.input}></TextInput>

                    <Text style={styles.actionName}>Start Time</Text>
                    <TextInput style={styles.input}></TextInput>

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
        backgroundColor:"#5D5D5D",
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
        color:"#686868",
        marginTop:25
    },
    type:{
        color:"#686868",
    },
    actionName:{
        fontWeight:"600",
        color:"#686868",
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
        backgroundColor:"#5D5D5D",
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