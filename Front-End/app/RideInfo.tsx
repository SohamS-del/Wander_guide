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

const RideInfo = () =>{

    return(
        
            <ScrollView style={styles.cont}>
                <StatusBar backgroundColor="#BA2966" barStyle="light-content" />
                <View style={styles.innerCont}>
                    <Text style={styles.name}>Himanshu Phalke</Text>
                    <Text style={styles.journeyStatus}>Journey started</Text>

                    <View style={styles.userInfoCont}>
                        <View style={styles.userInfo}>
                            <Text style={styles.vehicle}>Vehicle</Text>
                            <Text style={styles.vehicleName}>Swift Dezire</Text>

                            <Text style={styles.vehicle}>Jouney date</Text>
                            <Text style={styles.vehicleName}>12th January 2025</Text>

                            <Text style={styles.vehicle}>Contact number</Text>
                            <Text style={styles.vehicleName}>9191919191</Text>
                        </View>
                        
                    </View>

                    <View style={styles.journeyInfoCont}>
                        <Text style={styles.startLocation}>MIT ADT University</Text>
                        <Text style={styles.time}>starts 12:05 pm</Text>
                        <Image source={require('./assets/towards.png')} style={styles.arrowP}  />
                        <Text style={styles.endLocation}>Shop No 1 Gulmohor Regency, Symbiosis College Road, Viman Nagar, Pune - 411014 </Text>
                        <Text style={styles.distanceFilter}>1 km away from you</Text>
                    </View>
                </View>
            </ScrollView>
        
    );

}
const styles = StyleSheet.create({
cont:{
    flex:1,
    backgroundColor:"white"
},
innerCont:{
    width:"92%",
    marginLeft:"4%"
},
name:{
    fontSize:25,
    color:"#BA2966",
    marginTop:50,
    backgroundColor:"white",
    fontWeight:"800",
},
journeyStatus:{
    alignSelf:"flex-start",
    backgroundColor:"green",
    color:"white",
    paddingLeft:10,
    paddingRight:10,
    padding:5,
    borderRadius:20
},
userInfoCont:{
    height:"auto",
    backgroundColor:"#BA2966",
    borderRadius:10,
    marginTop:20
},
journeyInfoCont:{
    backgroundColor:"#5D5D5D",
    borderRadius:10,
    marginTop:20,
    height:"auto"
},
userInfo:{
    width:"85%",
    marginLeft:"7.5%",
    marginBottom:20,
   
},
vehicle:{
    fontSize:15,
    marginTop:20,
    color:"#fff"
},
vehicleName:{
    fontSize:20,
    color:"#fff",
    fontWeight:"800",
    marginTop:-3
},
startLocation:{
    textAlign:"center",
    color:"white",
    fontWeight:"800",
    fontSize:18,
    marginTop:30
},
time:{
    textAlign:"center",
    color:"white"
},
arrowP:{
    textAlign:"center",
    height:30,
    width:17,
    alignSelf:"center",
    marginTop:20
},
endLocation:{
    textAlign:"center",
    color:"white",
    fontWeight:"300",
    fontSize:16,
    marginTop:30,
    marginBottom:30
},
distanceFilter:{
    textAlign:"center",
    backgroundColor:"#00AC00",
    width:"80%",
    marginLeft:"10%",
    color:"white",
    padding:10,
    borderRadius:10,
    marginBottom:25
}
});
export default RideInfo;