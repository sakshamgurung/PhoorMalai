import React, { Component } from 'react'
import { Text, StyleSheet, View,PermissionsAndroid,Platform } from 'react-native'
import MapTest from './MapTest';


class MapWrap extends Component {
  
  state = {
    hasMapPermission:false
  }

  async requestFineLocation() {
    try {
        if(Platform.OS === 'android'){
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            //To Check, If Permission is granted
            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                this.setState({hasMapPermission:true});
            }
        }
    } catch (err) {
        console.warn(err);
    }
  }
  
  componentDidMount(){
    this.requestFineLocation();
  }

  render() {
    if(this.state.hasMapPermission){
      return (
        <View style={styles.container}>
          <MapTest navigationProps={this.props.navigation}/>
        </View>
      )
    }else{
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})

export default MapWrap;
