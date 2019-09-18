import React, { Component } from 'react'
import {StyleSheet, View,TouchableWithoutFeedback } from 'react-native'
import ICON from 'react-native-vector-icons/Entypo';
// import {withNavigation} from 'react-navigation';
class MenuButton extends Component {

  displayDrawer=()=>{
    this.props.navigationProps.openDrawer();
  };

  render() {
    return (
      <View style={styles.buttonContainerStyles}>
        <TouchableWithoutFeedback onPress={this.displayDrawer}>
          <ICON 
            name='menu'
            size={25}
            color='rgba(0, 0, 0, 1.0)'
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainerStyles:{
    padding:5,
    marginLeft:15,
    marginTop:10,
    backgroundColor:'rgba(148, 148, 148, 0.4)',
    borderRadius:50
  }
})

export default MenuButton;
