import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ICON from 'react-native-vector-icons/FontAwesome';

class ColorIndex extends Component {
  render() {
    const {indexName, color} = this.props;
    return (
      <View style={styles.indexContainer}>
        <Text style={styles.indexNameStyles}>{indexName}</Text>
        <ICON name='square' size={20} color={color} style={styles.colorIndexStyles}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  indexContainer:{
    flexDirection:'row',
    marginLeft:20
  },
  indexNameStyles:{
    color:'#fff'
  },
  colorIndexStyles:{
    marginLeft:20
  }
  
})

export default ColorIndex;