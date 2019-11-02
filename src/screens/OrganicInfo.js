import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import WasteCard from '../components/WasteCard'
class OrganicInfo extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <Text style={{color:"#ffffff", textAlign:"center", fontSize:25, fontWeight:"100",marginTop:30}}> 
        Organic items
        </Text>
        <ScrollView>
          <View style={styles.groupStyles}>
            <WasteCard src={require('../images/organic.jpg')}>
              Food
            </WasteCard>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  groupStyles:{
    flexDirection:"row"
  }
})
export default OrganicInfo;