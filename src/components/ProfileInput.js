import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'

class ProfileInput extends Component {
  render() {
    const {editable, placeholder, onChangeText, value} = this.props;
    return (
      <View>
        <TextInput 
          editable = {editable}
          placeholder = {placeholder}
          onChangeText = {onChangeText}
          value = {value}
          style = {styles.inputStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle:{
    backgroundColor:'rgba(221,221,221,0.2)',
    width:200,
    color:'white',
    paddingRight:5,
    fontSize:18,
    lineHeight:18,
    alignItems:'center'

},
})

export default ProfileInput;
