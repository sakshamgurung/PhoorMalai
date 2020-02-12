import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import OptionalCard from '../components/OptionalCard'
import BackToMapButton from '../components/BackToMapButton';

class Info extends Component {
  static navigationOptions =({navigation}) => {
    return{
      title:"Information",
      headerLeft:() => (
        <BackToMapButton navigationProps={navigation} />
      )
    }
  };
  gotoHowToScreen = ()=>{
    this.props.navigation.navigate("HowToScreen", {title: 'How to use this app?'});
  }
  gotoRecycleScreen = ()=>{
    this.props.navigation.navigate("RecycleScreen", {title: 'Recycle items'});
  }
  gotoUnrecycleScreen = ()=>{
    this.props.navigation.navigate("UnrecycleScreen", {title: 'Unrecycle items'});
  }
  gotoOrganicScreen = ()=>{
    this.props.navigation.navigate("OrganicScreen", {title: 'Organic items'});
  }
  gotoOtherScreen = ()=>{
    this.props.navigation.navigate("OtherScreen", {title: 'Other items'});
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <ScrollView>
          <OptionalCard onPress={()=> this.gotoHowToScreen()} title="How to use app?" src={require('../images/mobilemaps.png')}/>
          <OptionalCard onPress={()=> this.gotoRecycleScreen()} title="Recyclable items?" src={require('../images/recycleIcon.png')}>
            What are recycleable items?
          </OptionalCard>
          <OptionalCard onPress={()=> this.gotoUnrecycleScreen()} title="Unrecyclable items?" src={require('../images/unrecycleIcon.png')}>
            What are unrecyclable items?
          </OptionalCard>
          <OptionalCard onPress={()=> this.gotoOrganicScreen()} title="Organic items?" src={require('../images/organic3.png')}>
            What are organic items?
          </OptionalCard>
          <OptionalCard onPress={()=> this.gotoOtherScreen()} title="Other items?" src={require('../images/options2.png')}>
            Other items?
          </OptionalCard>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
export default Info;