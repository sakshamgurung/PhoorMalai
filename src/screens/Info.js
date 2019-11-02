import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import OptionalCard from '../components/OptionalCard'
class Info extends Component {
  gotoHowToScreen = ()=>{
    this.props.navigation.navigate("HowTo");
  }
  gotoRecycleScreen = ()=>{
    this.props.navigation.navigate("RecycleInfo");
  }
  gotoUnrecycleScreen = ()=>{
    this.props.navigation.navigate("UnrecycleInfo");
  }
  gotoOrganicScreen = ()=>{
    this.props.navigation.navigate("OrganicInfo");
  }
  gotoOtherScreen = ()=>{
    this.props.navigation.navigate("Other");
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <Text style={{color:"#ffffff", textAlign:"center", fontSize:25, fontWeight:"100",marginTop:30}}> 
        Information 
        </Text>
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