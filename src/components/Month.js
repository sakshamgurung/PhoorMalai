import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'

const Month = ({month, onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress = {onPress}>
        <View style={true ? styles.monthStyles:styles.monthSelected}>
            <Text>{month}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  monthStyles:{
    backgroundColor:"#e3f2fd", 
    paddingLeft:12,
    paddingTop:12,
    marginRight:5, 
    marginBottom:5, 
    borderRadius:50, 
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset:{width:0, height:4},
    elevation: 5,
    width:50, 
    height:50
  }
})
export default Month