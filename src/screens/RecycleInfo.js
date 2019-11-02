import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import WasteCard from '../components/WasteCard'
class RecycleInfo extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <Text style={{color:"#ffffff", textAlign:"center", fontSize:25, fontWeight:"100",marginTop:30}}> 
        Recyclable items
        </Text>
        <ScrollView>
          <View style={styles.groupStyles}>
            <WasteCard src={require('../images/glass.png')}>
              Glass
            </WasteCard>
            <WasteCard src={require('../images/paper.png')}>
              Paper
            </WasteCard>
            <WasteCard src={require('../images/metal.png')}>
              Metal
            </WasteCard>
          </View>
          <View style={styles.groupStyles}>
            <WasteCard src={require('../images/cartons.png')}>
              Cartons
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
export default RecycleInfo;