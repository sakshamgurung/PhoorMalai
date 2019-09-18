import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableWithoutFeedback } from 'react-native'
import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
class MarkSpotButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainerStyles}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <ICON 
            name='dump-truck'
            size={35}
            color='rgba(52, 132, 240, 1.0)'
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainerStyles:{
    position:'relative',
    alignSelf:'flex-end',
    bottom:350,
    padding:5,
    marginRight:15,
    backgroundColor:'rgba(148, 148, 148, 0.4)',
    borderRadius:50
  }
})

export default MarkSpotButton;
