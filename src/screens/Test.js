import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

class Test extends Component {
  render() {
    const {navigation} = this.props;
    let spot_ref = navigation.getParam("spot_ref");
    let spot_street = navigation.getParam("spot_street");
    let spot_city = navigation.getParam("spot_city");
    let spot_district = navigation.getParam("spot_district");
    return (
      <View>
        <Text> {spot_ref}</Text>
        <Text> {spot_street}</Text>
        <Text> {spot_city}</Text>
        <Text> {spot_district}</Text>
      </View>
    )
  }
}

//const styles = StyleSheet.create({})

export default Test;