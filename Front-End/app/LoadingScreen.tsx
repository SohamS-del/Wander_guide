import React,{useEffect} from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({navigation}: {navigation: any}){
  const newbutton1 = () =>{
    navigation.navigate("HomeScreen")
  }
  

  return (
      
    <SafeAreaView style={styles.container}>
      <Text onPress={newbutton1} style = {styles.pressme}>→</Text>
      
      
      <Image 
        style = {[styles.img_position,styles.logo_img]} 
        source ={require('./assets/logo.png')}
         
        />   
      <Image 
        source ={require('./assets/mit.png')} 
        style = {[styles.img_position,styles.mit_img]}
        />
      <Image 
        style = {[styles.img_position,styles.creiya_img]}
        source ={require('./assets/Creiya.png')} 
        />
      
         
    </SafeAreaView>
    )};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  pressme:{
    fontSize:60,
    textAlign:'center',
    bottom:-140
  },
  pressme2:{
    fontSize:40,
    textAlign:'center',
    bottom:-140
  },
  img_position:{
    position : 'absolute'
  },

  mit_img:{
    bottom:80,
    height:100,
    width:100,
    left:60
  },
  
  creiya_img:{
    bottom:80,
    height:100,
    width:200,
    right:20

  },

  logo_img:{
    top:170,
    height:332,
    width:447,
},
  but:{
    fontSize:50
  }
});


