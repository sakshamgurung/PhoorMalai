import React,{Component} from 'react';
import {View, Text} from 'react-native';

class History extends Component{
  render(){
    return(
      <View style={styles.textStyle}>
        <Text>History</Text>
      </View>
    );
  }
}

const styles = {
  textStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default History; 