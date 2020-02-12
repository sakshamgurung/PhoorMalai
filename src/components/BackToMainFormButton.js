import React, { Component } from 'react'
import {StyleSheet, View,TouchableWithoutFeedback } from 'react-native'
import ICON from 'react-native-vector-icons/AntDesign';

class BackToMainFormButton extends Component {

  displayMainFormScreen=()=>{
   this.props.navigationProps.navigate("Form");
  };

  render() {
    return (
      <View style={styles.buttonContainerStyles}>
        <TouchableWithoutFeedback onPress={this.displayMainFormScreen}>
          <ICON 
            name='arrowleft'
            size={25}
            color='rgba(255, 255, 255, 1.0)'
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainerStyles:{
    marginLeft:10
  }
})

export default BackToMainFormButton;

