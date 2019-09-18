import React, { Component } from 'react'
import { Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native'
import MapScreen from './MapScreen';
export default class App extends Component {

  state={hasMapPermission:false};
  
  componentDidMount(){
   this.requestFineLocation();
  }

  async requestFineLocation(){
    try{
      if(Platform.OS === 'android'){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          this.setState({hasMapPermission: true});
        }
      }
    }catch(err){
      console.warn(err);
    }
  }

  render() {
    if(this.state.hasMapPermission){
      return <MapScreen />
    }
    return null;
  }
} 

const styles = StyleSheet.create({})
