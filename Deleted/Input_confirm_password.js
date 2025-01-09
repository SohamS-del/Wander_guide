
import { StyleSheet, Text, View ,TextInput,Animated} from 'react-native'
import React from 'react'





const Input_confirm_password = () => {
    const [UserEmail, SetEmail] = React.useState('');
    

    
  return (
    <View style = {styles.container}>
      <TextInput
                numberOfLines={4}
                placeholder  = '  Confirm Your Password'
                placeholderTextColor="#761B89"
                maxLength={256}
                onChangeText={text =>SetEmail(text)}
                value={UserEmail}
                style={styles.textInput}
                secureTextEntry
              />
    </View>
  )
}

export default Input_confirm_password

const styles = StyleSheet.create({
    ConfirmtextInput:{
      borderColor:'black',
      width:300,
      height:45,
    },
    Confirmcontainer:{
      top:-80,
      alignItems:'center',
      borderColor:'#522D7E',
      borderWidth:1,
      borderRadius:7,
}
})