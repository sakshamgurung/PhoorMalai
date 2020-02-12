import React,{Component} from 'react';
import {Modal,Text,View,TouchableOpacity,Image,StyleSheet,ImageBackground} from 'react-native';
import {connect} from 'react-redux'
import {quantityChanged, formSubmitted, wasteTypeSelected,togglePickerDisplay} from '../actions';
import CollectorButton from '../components/CollectorButton';
import CustomerInputDialog from '../components/CustometInputDialog';
import CustomerSubmitBtn from '../components/CustomerSubmitBtn';
import BackToMainFormButton from '../components/BackToMainFormButton';
class Customer extends Component{
  static navigationOptions =({navigation}) => {
    return{
      headerTitle:'As customer',
      headerStyle:{backgroundColor:'#4076bd'},
      headerTintColor:'#fff',
      headerTitleStyle:{
        fontSize:25
      },
      headerLeft:() => (
        <BackToMainFormButton navigationProps={navigation} />
      )
    }
  };
  setPickerValue = (pickedValue)=>{
      this.props.wasteTypeSelected(pickedValue);
    } 
  togglePicker = (value)=>{
    this.props.togglePickerDisplay(value);
  }
  onQuantityChanged = (text) => {
    this.props.quantityChanged(text);
  }
  onSubmit = () =>{
    const {navigation} = this.props;
    const {quantity, wasteType} = this.props;
    let spot_ref = navigation.getParam("spot_ref");
    this.props.formSubmitted({spot_ref, wasteType, quantity});
  }
  render(){
    const {navigation} = this.props;
    let msg = null;
    let spot_ref = navigation.getParam("spot_ref");
    let spot_street = navigation.getParam("spot_street");
    let spot_city = navigation.getParam("spot_city");
    let spot_district = navigation.getParam("spot_district");
    
    const wasteTypes = [{
      title:'organic',
      value:'organic'
    },
    {
      title:'recycle',
        value:'recycle'
      },
      {
        title:'unrecycle',
        value:'unrecycle'
      },
      {
        title:'other',
        value:'other'
      }
      
    ]
    if(this.props.message === ''){
      msg = <Text></Text>;
    }else if(this.props.message === 'Successful'){
      msg = <Text style={{color:'#5EBE78', fontWeight:'100', fontSize:20}}>{this.props.message}</Text>;
    }else if(this.props.message === 'No Success'){
      msg = <Text style={{color:'#d32f2f', fontWeight:'100', fontSize:20}}>{this.props.message}</Text>;
    }
    return(
      <ImageBackground style={styles.backStyle} source={require('../images/final.png')}>
         <View style={{flexDirection:'row',flex:0.2,paddingLeft:20,paddingTop:20}}>
          <View style={{justifyContent:'center',alignItems:'center',paddingLeft:30,marginLeft:10,width:330,height:35}}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>
                {spot_street+","+spot_city}
                </Text>
              {msg}
          </View>
         </View>

         <View style={styles.viewStyle}>
          <View style={{width:'100%',height:'100%',padding:20,borderTopLeftRadius:20,borderTopRightRadius:20}}>
            {/* header */}
            <View style={{width:'100%',alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:23,color:'white'}}>Fill your waste details</Text>
            </View>
            {/* waste type picker */}
            <View style={{flexDirection:'row',paddingTop:20}}>
              <Text style={{fontSize:20,color:'white',padding:5}}>
                Waste type:
              </Text>
              <CollectorButton onPress={()=>{this.togglePicker(true)}}>{this.props.wasteType}</CollectorButton>
            </View>
            {/* no of boras */}
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:20,color:'white',padding:5}}>Quantity in kg:</Text>
              </View>
              <View>
                  <CustomerInputDialog value={this.props.quantity} onChangeText={this.onQuantityChanged.bind(this)} />
              </View>
            </View>
            {/* location */}
            <View style={{flexDirection:'row', paddingTop:20}}>
              <Text style={{fontSize:20, color:'white',padding:5, fontWeight:'bold'}}>Location :{spot_street+","+spot_city}</Text>
            </View>
            {/* submit */}
            <View style={{paddingTop:50,width:'100%',alignItems:'center'}}>
              <CustomerSubmitBtn onPress={()=>this.onSubmit()}>Submit</CustomerSubmitBtn>
            </View>
          </View>
          <View>
            <Modal animationType={"slide"} visible={this.props.displayPicker} transparent={true} onRequestClose={()=>{console.log('request for close')}} >
               <View style={styles.modalStyle}>
                <View style={{width:'100%',alignItems:'center'}}>
                   <Text style={{fontWeight:'bold',alignItems:'center',color:'white',fontSize:19,paddingBottom:5,paddingTop:5}}>
                     Pick waste material types:
                   </Text>
                </View>   
                {wasteTypes.map((value,index)=>{
                  return(
                    <TouchableOpacity key={index} onPress={()=>{this.setPickerValue(value.value)}} style={styles.pickerListStyle}>
                        <Text style={{fontSize:20,color:'white'}}>{value.title}</Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity onPress={()=>this.togglePicker(false)}>
                  <Text style={{fontSize:20,color:'white'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
           </View>
          </View>
      </ImageBackground>
  );}
}

const styles = StyleSheet.create({
    backStyle:{
      width:'100%',
      height:'100%',
      flex:1,
      flexDirection:'column',   
    },
    viewStyle:{
      flex:0.9,  
      justifyContent:'center',
      alignItems:'center'
    },
    modalStyle:{
      shadowColor:'#0000',
      shadowOffset:{width:5,height:5},
      shadowOpacity:1, 
      padding:20,
      bottom:0,
      left:0,
      right:0,
      borderRadius:40,
      backgroundColor: 'rgba(0,153,204,1)',
      alignItems:'center',
      position:'absolute',
      borderRadius:15,
      borderTopWidth:1,
      borderColor:'white'
    },
    pickerListStyle:{
      paddingTop:5,
      paddingBottom:5,
      width:'100%',
      alignItems:'center',
      backgroundColor:'rgba(221,221,221,0.2)'
    }
})

const mapStateToProps = (state) => {
  const {
    quantity,
    displayPicker,
    wasteType,
    message
  } = state.form;
  return {
    quantity,
    displayPicker,
    wasteType,
    message
  }
}

export default connect(mapStateToProps,{
  quantityChanged,
  togglePickerDisplay,
  wasteTypeSelected,
  formSubmitted
})(Customer);