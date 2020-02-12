import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import OptionalCard from '../components/OptionalCard'
import BackToMainInfoButton from '../components/BackToMainInfoButton';

class HowTo extends Component {
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
          <OptionalCard title="Choose waste spot" src={require('../images/trashIcon.png')}>
            First step: Choose nearest predefined location from map interface.
          </OptionalCard>
          <OptionalCard title="Choose as user" src={require('../images/asUser.png')}>
            Second step: Select "As user" to add waste info in choosen waste spot.
          </OptionalCard>
          <OptionalCard title="Add waste type info" src={require('../images/wasteType.png')}>
            Third step: Select "Waste type"
          </OptionalCard>
          <OptionalCard title="Add waste quantity" src={require('../images/quantityIcon.png')}>
            Third step: Give "waste quantity in kg". Quantity of waste is estimated.
          </OptionalCard>
          <OptionalCard title="Submit" src={require('../images/submit.png')}>
            Fourth step: Submit the waste info and you are done.
          </OptionalCard>
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
export default HowTo;