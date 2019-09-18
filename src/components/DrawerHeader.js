import React from 'react';
import {Image,Text,View,AsyncStorage} from 'react-native';
import {DrawerItems} from 'react-navigation';

let email = '';
getEmail= async()=>{
   email = await AsyncStorage.getItem('email');
}
const DrawerHeader = (props) =>
{
   return(
    <View>
       <View style={{paddingTop:25,paddingBottom:25,alignItems:'center',justifyContent:'center'}}>
         <Image style={{width:150,height:150,borderRadius:75}} source={require('../images/saveEarth.png')} ></Image>
         <Text>{this.getEmail}</Text>
       </View>
       {/* <Button onPress={{}}></Button> */}
       <DrawerItems {...props} />
    </View>
   ); 
}

export default DrawerHeader;