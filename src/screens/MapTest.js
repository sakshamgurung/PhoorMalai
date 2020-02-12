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
  gotoFormScreen = (data)=>{
    this.props.navigationProps.navigate("Form",{
      spot_ref:data._id,
      spot_street:data.address[0].street,
      spot_city:data.address[0].city,
      spot_district:data.address[0].district
    });
  }
  render() {
    this.dumpingMarkers = this.props.dumpSiteLocation.map((data)=>(
      /*while using coordinate attribute the value should preserve it's precesion else marker
      will not appear*/
      <MapView.Marker  
      key={data._id}
      coordinate={data.loc}
      title={data.address[0].street}
      description={data.address[0].city,data.address[0].district} 
      onPress={()=> this.gotoFormScreen(data)}
      >
        <View style={styles.trashIconStyles}>
          <FontAwesome5Icon name='trash-restore' color='rgb(255, 255, 255)' size={15}/>
        </View>
      </MapView.Marker>
    ));
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
          {this.dumpingMarkers}
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
