import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import WasteCard from '../components/WasteCard'
import BackToMainInfoButton from '../components/BackToMainInfoButton';

class OtherInfo extends Component {
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
            <WasteCard src={require('../images/ewaste.png')}>
              Ewaste
            </WasteCard>
            <WasteCard src={require('../images/mercury.jpg')}>
              Mercury
            </WasteCard>
            <WasteCard src={require('../images/gasCan.jpg')}>
              Gas Can
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
export default OtherInfo;