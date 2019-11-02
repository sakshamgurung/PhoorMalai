import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import WasteCard from '../components/WasteCard'
class UnrecycleInfo extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <Text style={{color:"#ffffff", textAlign:"center", fontSize:25, fontWeight:"100",marginTop:30}}> 
        Unrecyclable items
        </Text>
        <ScrollView>
          <View style={styles.groupStyles}>
            <WasteCard src={require('../images/unrecycle.jpg')}>
              Plastic Pack
            </WasteCard>
            <WasteCard src={require('../images/disposiblePlastic.jpg')}>
              Plastic Plate
            </WasteCard>
            <WasteCard src={require('../images/pvcPacking.jpg')}>
              PVC pack
            </WasteCard>
          </View>
          <View style={styles.groupStyles}>
            <WasteCard src={require('../images/straws.jpg')}>
              Straws
            </WasteCard>
            <WasteCard src={require('../images/plasticBottle.png')}>
              Bottle
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
export default UnrecycleInfo;