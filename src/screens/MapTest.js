import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';
import {getUserLocation,getSpotLocation} from '../actions';
import MarkSpotButton from '../components/MarkSpotButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class MapTest extends Component {

  componentDidMount(){
    this.locationWatchId = Geolocation.watchPosition(pos => {
      let lon = pos.coords.longitude;
      let lat = pos.coords.latitude;
      this.props.getUserLocation({lon,lat});
      this.props.getSpotLocation({lon,lat});
    },
    (err) => console.warn(err),
    {enableHighAccuracy:true}
    );
  }

  componentWillUnmount(){
    Geolocation.clearWatch(this.locationWatchId);
  }
  
  onButtonPress = ()=>{
    const {
      lat, lon
    } = this.props;
    this.props.getSpotLocation({lon,lat});
  }

  render() {
    // if(this.props.loadSpotMarker){
     let dumpingMarkers = this.props.dumpSiteLocation.map(data=>(
          <MapView.Marker  
            key={data._id}
            coordinate={{latitude:data.loc[0],longitude:data.loc[1]}}
            description={data._id} 
          >
            <View style={styles.trashIconStyles}>
              <FontAwesome5Icon name='trash-restore' color='rgb(255, 255, 255)' size={15}/>
            </View>
          </MapView.Marker>
      ));
    //}
    return (
      <View style={styles.container}>
        <MapView 
          showsUserLocation
          followsUserLocation
          style={styles.map}
          region={{
            latitude:Number( this.props.lat),
            longitude:Number(this.props.lon),
            latitudeDelta:0.015,
            longitudeDelta:0.0121
          }}
          >
        {dumpingMarkers}
        </MapView>
       
        <MarkSpotButton onPress = {this.onButtonPress.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position:"absolute",
    left:0,
    right:0,
    top:0,
    bottom:0
  },
  trashIconStyles:{
      padding:10,
      backgroundColor:'rgba(22, 110, 34, 0.7)',
      borderRadius:50
  }
});

const mapStateToProp = (state) => {
  const{
    lon,
    lat,
    loadSpotMarker,
    dumpSiteLocation
  }=state.map;
  return{
    lon,
    lat,
    loadSpotMarker,
    dumpSiteLocation
  }
}

export default connect(mapStateToProp,{
  getUserLocation,
  getSpotLocation
})(MapTest)
