import React,{Component} from 'react';
import {connect} from 'react-redux';
import {showLocationWasteData, collectWaste} from '../actions';
import {Card,Text,View,TouchableOpacity,Image,StyleSheet,ImageBackground} from 'react-native';
import CollectorCard from '../components/CollectorCard';
import CollectorCardSection from '../components/CollectorCardSection';
import CardSection from '../components/CardSection';
import NewButton from '../components/NewButton';

let spot_ref = null;
let spot_street = null;
let spot_city = null;
let spot_district = null;
let collector_email = null;
class Collector extends Component{
  onPressBack = ()=>{
    this.props.navigation.navigate('MainForm');
  }
  onCollect = ()=>{
    this.props.collectWaste(spot_ref);
  }
  onRefresh = ()=>{
    this.props.showLocationWasteData({spot_ref, collector_email});
  }
  render(){
    const {navigation} = this.props;
    spot_ref = navigation.getParam("spot_ref");
    spot_street = navigation.getParam("spot_street");
    spot_city = navigation.getParam("spot_city");
    spot_district = navigation.getParam("spot_district");
    collector_email = navigation.getParam("collector_email");
  return(
    <ImageBackground style={styles.backStyle} source={require('../images/final.png')}>
        <View style={{flexDirection:'row',flex:0.2,paddingLeft:20,paddingTop:20}}>
        <TouchableOpacity onPress={()=>{this.onPressBack()}}>
            <Image style={{width:25,height:25}} source={require('../images/left-arrow.png')} />
        </TouchableOpacity>
        <View style={{justifyContent:'center',alignItems:'center',paddingLeft:30,borderWidth:1,borderColor:'white',marginLeft:10,width:330,height:35}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>
              {spot_street+","+spot_city}
            </Text>
        </View>
        </View>
        <View style={styles.viewStyle}>
        <CollectorCard>
          <CollectorCardSection>
          <View style={{width:'90%'}}>
            <View style={{flexDirection:'row'}}>
            <View style={{height:120,alignItems:'center',justifyContent:'center',flex:0.5}}>
              <Text style={{fontSize:20}}>Recycle</Text>
              <Text style={{fontSize:30,color:'#808080'}} >{this.props.recycle}</Text>
              <Text>Kg</Text>
            </View>
            <View style={{height:120,alignItems:'center',justifyContent:'center',flex:0.5}}>
              <Text style={{fontSize:20}}>Organic</Text>
              <Text  style={{fontSize:30,color:'#808080'}}>{this.props.organic}</Text>
              <Text>Kg</Text>
            </View>
            </View>
          </View> 
          </CollectorCardSection>
          <CollectorCardSection>
          <View style={{width:'90%'}}>
            <View style={{flexDirection:'row'}}>
            <View style={{height:120,alignItems:'center',justifyContent:'center',flex:0.5}}>
              <Text style={{fontSize:20}}>Unrecycle</Text>
              <Text style={{fontSize:30,color:'#808080'}}>{this.props.unrecycle}</Text>
              <Text>Kg</Text>
            </View>
            <View style={{height:120,alignItems:'center',justifyContent:'center',flex:0.5}}>
              <Text style={{fontSize:20}}>Other</Text>
              <Text style={{fontSize:30,color:'#808080'}}>{this.props.other}</Text>
              <Text>Kg</Text>
            </View>
            </View>
          </View> 
          </CollectorCardSection>
          <CollectorCardSection>
          <View style={{flexDirection:'column'}}>
            <NewButton onPress={()=>this.onCollect()}>Collect</NewButton>
            <NewButton onPress={()=>this.onRefresh()}>Refresh</NewButton>
          </View>  
          </CollectorCardSection>
        </CollectorCard>
        </View>
    </ImageBackground>
  );}
}

const styles = StyleSheet.create({
    backStyle:{
     width:'100%',
     height:'100%',
     flexDirection:'column',
     flex:1
    },
    viewStyle:{
      flex:0.9,
      borderWidth:1,
      borderColor:'white',
      borderTopRightRadius:20,
      borderTopLeftRadius:20,  
      justifyContent:'center',
      alignItems:'center'
      }
})

const mapStateToProps = (state)=>{
  const{
    recycle,
    unrecycle,
    organic,
    other
  } = state.collector;
  return{
    recycle,
    unrecycle,
    organic,
    other
  }
}

export default connect(mapStateToProps,{
  showLocationWasteData,
  collectWaste
})(Collector);