import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import WasteCard from '../components/WasteCard'
import BackToMainInfoButton from '../components/BackToMainInfoButton';

class RecycleInfo extends Component {
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