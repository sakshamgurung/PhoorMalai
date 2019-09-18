import React,{Component} from 'react';
import {View,Image,StyleSheet,Button,ActivityIndicator} from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import RoundedButtonForUserLocation from '../components/RoundedButtonForUserLocation';
import RoundedButtonForDumpingLocations from '../components/RoundedButtonForDumpingLocations';

class MapScreen extends Component {
    state = {
        userLongitude:0,
        userLatitude:0,
        // resDumpingPlaces:[],
        // dumpingPlaces:[],
        // mapLoaded:false,
        // userLocation:null,
        // currentUser:null
    };
    // componentDidMount(){
    //     this.locationWatchId = Geolocation.watchPosition((pos) => {
    //         this.setState({
    //             userLongitude:pos.coords.longitude,
    //             userLatitude:pos.coords.latitude,
                //    userLocation:{
                    //         longitude:pos.coords.longitude,
                    //         latitude:pos.coords.latitude,
            //         latitudeDelta:0.0322,
            //         longitudeDelta:0.0421
            //    }
    //    });
//     },
//     (err) => console.warn(err),
//     {enableHighAccuracy:true}
//     );
// };
// componentWillUnmount(){
//     Geolocation.clearWatch(this.locationWatchId);
// };

getSpotLocation = ()=>{
        let token = this.props.navigation.getParam('token');
        let lon = 0;
        let lat = 0;
        let arr = [];
        let spot_ref = '';
        //let t = await AsyncStorage.getItem('token');
        axios.get('http://10.0.2.2:5000/api/spot_list',{
            headers:{
                'x-auth-token': token,
                'lon':this.state.userLongitude,
                'lat':this.state.userLatitude
            }
        })
        .then(res => {
            this.setState({resDumpingPlaces:res.data});
            this.state.resDumpingPlaces.map((dumpingPlaceData)=>{
                lon = dumpingPlaceData.loc[0],
                lat = dumpingPlaceData.loc[1],
                arr = []
                spot_ref = dumpingPlaceData._id;
                arr.push({lon:lon,lat:lat,spot_ref:spot_ref});
            });
            this.setState({dumpingPlaces:arr});
        });
    }

    // onRegionChangeComplete=(region)=>{
    //     this.setState({region})
    //     console.log(region)
    // }
  
  render(){
        // let userLocationMarker = null;
        // let dumpingMarkers = null;
        // if(this.state.userLocation){
        //     return userLocationMarker = <MapView.Marker coordinate={this.state.userLocation}  />
        // }
        // if(this.state.dumpingPlaces){
        //      dumpingMarkers = this.state.dumpingPlaces.map(userPlace=>(
        //         <MapView.Marker  pinColor='orange' coordinate={userPlace} key={userPlace.spot_ref} >
        //         </MapView.Marker>
        //     ));
        // }
        return(
            <View style={styles.viewStyle}>
                {/* <View>
                    <View style={{marginLeft:360}}><RoundedButtonForUserLocation onPress={this.setUserLocation} /></View>
                    <View style={{marginLeft:180}}><RoundedButtonForDumpingLocations onPress={this.connectDB} /></View>
                </View> */}
                <View style={styles.mapContainer}>
                    <MapView
                        showsUserLocation
                        followsUserLocation
                        region={{
                            latitude:this.state.userLatitude,
                            longitude:this.state.userLongitude,
                            latitudeDelta:0.0322,
                            longitudeDelta:0.0421
                        }}
                        // initialRegion={{
                        //     latitude:37.78825,
                        //     longitude:-122.4324,
                        //     latitudeDelta:0.0322,
                        //     longitudeDelta:0.0421
                        //}}
                        //region={this.state.userLocation}
                        style={styles.mapStyles} >
                        {/* {userLocationMarker}
                        {dumpingMarkers} */}
                    </MapView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   viewStyle:{
    marginTop:-60,   
    width:'100%',
    height:'120%',
},
    mapContainer:{
        width:'100%',
        height:'100%'
    },
    mapStyles:{
       width:'100%',
       height:'100%'
    }
});

export default MapScreen;

// import  React, {Component} from 'react';
// import { View, Text } from 'react-native';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       latitude: null,
//       longitude: null,
//       timestamp: null
//     }
//   }
  
//   componentDidMount() {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({ 
//           latitude: position.coords.latitude ,
//           longitude: position.coords.longitude,
//           timestamp:  position.timestamp
//         })
//       },
//       (error) => { console.log(error); },
//       { enableHighAccuracy: true, timeout: 30000 }
//     )
//   }
  
//   render() {
//     return  (
//       <View>
//         <Text>latitude:{this.state.latitude}</Text>
//         <Text> longitude:{this.state.longitude}</Text>
//         <Text>timestamp:{this.state.timestamp}</Text>
//       </View>
//     )
//   }
// }