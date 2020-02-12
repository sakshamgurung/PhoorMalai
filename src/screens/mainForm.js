import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableOpacity,Image,TextInput,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {displayCollectorDialog,collectorEmailChanged, checkEmail, resetCollectorDialog} from '../actions';
import NewButton from '../components/NewButton';
import CustomerInputDialog from '../components/CustometInputDialog';
import CheckButton from '../components/CheckButton';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import BackToMapButton from '../components/BackToMapButton';

let spot_ref = null;
let spot_street = null;
let spot_city = null;
let spot_district = null;

class MainForm extends Component{
    static navigationOptions =({navigation}) => {
        return{
          headerTitle:'Use as',
          headerStyle:{backgroundColor:'#4076bd'},
          headerTintColor:'#fff',
          headerTitleStyle:{
            fontSize:25
          },
          headerLeft:() => (
            <BackToMapButton navigationProps={navigation} />
          )
        }
    };
    componentDidMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
              this.props.resetCollectorDialog();
            }
          );
    }
    componentWillUnmount(){
        this.willFocusSubscription.remove();
    }

    onPressBack=()=>{
        this.props.navigation.navigate('Map')
    }
    onCollectorEmailChange = (text) => {
        this.props.collectorEmailChanged(text);
    }
    onCheck = () => {
        this.props.checkEmail(this.props.collector_email,this.props.navigation,
            spot_ref,
            spot_street,
            spot_city,
            spot_district
        );
    }
    displayDialog = () =>{
        if(this.props.collectorDialog){
            return(
                <View style={styles.collectorDialogStyle}>
                    <View style={{alignItems:'center'}}>
                        <CustomerInputDialog
                        keyType={'default'} 
                        placeholder={"example@gmail.com"}
                        value={this.props.collector_email} 
                        onChangeText={this.onCollectorEmailChange.bind(this)} />
                        <Text style={{color:'#d32f2f',fontSize:15,fontWeight:"100"}}>{this.props.notFoundMessage}</Text>
                    </View>
                    <View style={{alignItems:'center',marginTop:20}}>
                        <NewButton onPress={() => this.onCheck()}>Check</NewButton>
                    </View>
                </View>
            );
       }
        else{
            return(
                <Text> </Text>
            );
        }
    }    
    
    collectorDialog=()=>{
        this.props.displayCollectorDialog(true);
    }    
        
    gotoCustomerScreen = ()=>{
        this.props.navigation.navigate("Customer",{
            spot_ref,
            spot_street,
            spot_city,
            spot_district
        });
    }
   render(){
    const {navigation} = this.props;
    spot_ref = navigation.getParam("spot_ref");
    spot_street = navigation.getParam("spot_street");
    spot_city = navigation.getParam("spot_city");
    spot_district = navigation.getParam("spot_district");
    return(
        <ImageBackground source={require('../images/final.png')} style={{flex:1,flexDirection:'column'}}>
            <View style={{flexDirection:'row',flex:0.2,paddingTop:20,paddingLeft:20}}>
                <View style={{justifyContent:'center',alignItems:'center',paddingLeft:30,marginLeft:10,width:330,height:35}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>
                    {spot_street+","+spot_city}
                    </Text>
                </View>
            </View>
            <View style={{flex:0.8,alignItems:'center',paddingTop:50}}>
                <View style={{borderBottomWidth:2,borderColor:'white',marginBottom:10}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>USE AS</Text></View>
                <View><NewButton onPress={()=> this.gotoCustomerScreen()}>As User</NewButton></View>
                <View><NewButton  onPress={()=>{this.collectorDialog()}}>As Collector</NewButton></View>
                <View style={{height:50,width:'60%'}}>{this.displayDialog()}</View>
            </View> 
        </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
    collectorDialogStyle:{
        justifyContent:'space-between'
    }
})
const mapStateToProps = (state) => {
    const {
        collectorDialog,
        collector_email,
        notFoundMessage
    } = state.mainForm;
    return {
        collectorDialog,
        collector_email,
        notFoundMessage
    }
}

export default connect(mapStateToProps, {
    resetCollectorDialog,
    displayCollectorDialog,
    collectorEmailChanged,
    checkEmail
})(MainForm);