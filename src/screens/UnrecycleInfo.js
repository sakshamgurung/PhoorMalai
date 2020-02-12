import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import WasteCard from '../components/WasteCard'
import BackToMainInfoButton from '../components/BackToMainInfoButton';

class UnrecycleInfo extends Component {
  static navigationOptions =({navigation}) => {
    return{
      title: navigation.getParam('title'),
      headerLeft:() => (
        <BackToMainInfoButton navigationProps={navigation} />
      )
    }
  };
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
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