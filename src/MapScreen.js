import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
//import ICON from 'react-native-vector-icons/Entypo';
import Geolocation from 'react-native-geolocation-service';
export class MapScreen extends Component{

  state = {
    userLongitude: 0,
    userLatitude: 0
  }

  componentDidMount(){
    this.locationWatchId = Geolocation.watchPosition(pos => {
      this.setState({
        userLongitude:pos.coords.longitude,
        userLatitude:pos.coords.latitude
      })},
    (err) => console.warn(err),
    {enableHighAccuracy:true}
    );
  }
  componentWillUnmount(){
    Geolocation.clearWatch(this.locationWatchId);
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView
            showsUserLocation
            followsUserLocation
            style={styles.map}
            region={{
              latitude: this.state.userLatitude,
              longitude: this.state.userLongitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
        >
        </MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex:1,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default MapScreen ;