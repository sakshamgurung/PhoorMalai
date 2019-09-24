import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableOpacity,Image,TextInput,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {displayCollectorDialog,collectorEmailChanged, checkEmail} from '../actions';
import NewButton from '../components/NewButton';
import CheckButton from '../components/CheckButton';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

let spot_ref = null;
let spot_street = null;
let spot_city = null;
let spot_district = null;

class MainForm extends Component{

    componentDidMount(){
        if(this.props.redirect){
            this.gotoCollectorScreen();
        }
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
                    <Card>
                        <CardSection>
                            <TextInput 
                            value={this.props.collector_email} 
                            onChangeText={this.onCollectorEmailChange.bind(this)}/>
                        </CardSection>
                        <CardSection>
                            <CheckButton onPress={() => this.onCheck()}>Check</CheckButton>
                        </CardSection>
                    </Card>
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
    // gotoCollectorScreen = ()=>{
    //     this.props.navigation.navigate("Collector",{
    //         spot_ref,
    //         spot_street,
    //         spot_city,
    //         spot_district
    //     });
    // }
   render(){
    const {navigation} = this.props;
    spot_ref = navigation.getParam("spot_ref");
    spot_street = navigation.getParam("spot_street");
    spot_city = navigation.getParam("spot_city");
    spot_district = navigation.getParam("spot_district");
    return(
        <ImageBackground source={require('../images/final.png')} style={{flex:1,flexDirection:'column'}}>
            <View style={{flexDirection:'row',flex:0.2,paddingTop:20,paddingLeft:20}}>
                <TouchableOpacity onPress={()=>{this.onPressBack()}}>
                    <Image style={{width:25,height:25}} source={require('../images/left-arrow.png')} />
                </TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center',paddingLeft:30,borderWidth:1,borderColor:'white',marginLeft:10,width:330,height:35}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>
                    {spot_street+","+spot_city}
                    </Text>
                </View>
            </View>
            <View style={{flex:0.8,alignItems:'center',paddingTop:50}}>
                <View style={{borderBottomWidth:2,borderColor:'white',marginBottom:10}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>USE AS</Text></View>
                <View><NewButton onPress={()=> this.gotoCustomerScreen()}>As User</NewButton></View>
                <View><NewButton  onPress={()=>{this.collectorDialog()}}>As Collector</NewButton></View>
                <View style={{height:50,width:'50%'}}>{this.displayDialog()}</View>
            </View> 
        </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
    collectorDialogStyle:{
        justifyContent:'space-between'
    },
    checkButtonStyle:{
        backgroundColor:'green',
        color:'white'
    }
})
const mapStateToProps = (state) => {
    const {
        collectorDialog,
        collector_email,
        redirect
    } = state.mainForm;
    return {
        collectorDialog,
        collector_email,
        redirect
    }
}

export default connect(mapStateToProps, {
    displayCollectorDialog,
    collectorEmailChanged,
    checkEmail
})(MainForm);