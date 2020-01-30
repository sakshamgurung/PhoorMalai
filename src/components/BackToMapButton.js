import React, { Component } from 'react'
import {StyleSheet, View,TouchableWithoutFeedback } from 'react-native'
import ICON from 'react-native-vector-icons/AntDesign';

class BackToMapButton extends Component {

  displayHomeScreen=()=>{
   this.props.navigationProps.navigate("MapScreen");
  };

  render() {
    return (
      <View style={styles.buttonContainerStyles}>
        <TouchableWithoutFeedback onPress={this.displayHomeScreen}>
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

export default BackToMapButton;

