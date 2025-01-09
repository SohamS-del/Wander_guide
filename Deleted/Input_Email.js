
import { StyleSheet, Text, View ,TextInput,Animated} from 'react-native'
import React from 'react'






const Input_Email = () => {
    const [UserEmail, SetEmail] = React.useState('');  
  return (
    <View style = {styles.container}>
      <TextInput 
                style={styles.textInput}
                numberOfLines={4}
                placeholder  = '  Enter Your Email'
                placeholderTextColor="#761B89"
                maxLength={256}
                onChangeText={text =>SetEmail(text)}
                value={UserEmail}
                
              />
    </View>
  )
}

export default Input_Email

const styles = StyleSheet.create({
    EmailtextInput:{
      width:300,
      height:45
   },
    Emailcontainer:{
      top:-120,
      alignItems:'center',
      borderColor:'#522D7E',
      borderWidth:1,
      borderRadius:7
}
})