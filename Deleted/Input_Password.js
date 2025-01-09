
import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React from 'react'

const Input_Password = () => {
    const [UserPassword, SetPassword] = React.useState('');
  return (
    <View style = {styles.container}>
      <TextInput
                numberOfLines={4}
                placeholder='  Enter Your Password'
                placeholderTextColor="#761B89"
                maxLength={256}
                onChangeText={text =>SetPassword(text)}
                value={UserPassword}
                style={styles.textInput}
                secureTextEntry
              />
    </View>
  )
}

export default Input_Password

const styles = StyleSheet.create({
      PasstextInput:{
      borderColor:'black',
      width:300,
      height:45,
      
    },
    Passcontainer:{
      top:-100,
      alignItems:'center',
      borderColor:'#522D7E',
      borderWidth:1,
      borderRadius:7,
    }
})