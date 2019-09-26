import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import CustomerInputDialog from '../components/CustometInputDialog';
import {getProfile} from '../actions';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class Profile extends Component {
  render() {
    this.props.getProfile();
    return (
      <View style={styles.containerStyle}>
        <View>
          <MaterialIcon name='account-box' size={100} color={'#e91e63'}/>
        </View>
        <View>
          <Text style={{color:"white", fontSize:25, padding:5}}>Profile</Text>
        </View>
        <View>
          <Text style={{color:"#d32f2f", fontSize:15, padding:5}}>{this.props.message}</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom:10}}>
          <View style={{justifyContent:'center', marginRight:10}}>
            <Text style={{fontSize:20,color:'white',padding:5}}>Name:</Text>
          </View>
          <View>
              <CustomerInputDialog 
              editable={false}
              value={this.props.name} 
              />
          </View>
        </View>
        <View style={{flexDirection:'row', marginBottom:10}}>
          <View style={{justifyContent:'center', marginRight:10}}>
            <Text style={{fontSize:20,color:'white',padding:5}}>Email:</Text>
          </View>
          <View>
              <CustomerInputDialog 
              editable={false}
              value={this.props.email} 
              />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle:{
    flex:1,
    backgroundColor:'#2c2c2e',
    justifyContent:'center',
    alignItems:'center'
  }
})

const mapStateToProps = (state) => {
  const{
    name, email, message
  } = state.profile;
  return{
    name, email, message
  }
}

export default connect(mapStateToProps, {
  getProfile
})(Profile);