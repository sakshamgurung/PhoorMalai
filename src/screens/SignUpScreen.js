import React,{Component} from 'react';
import {TouchableHighlight,View,Text,StyleSheet,ImageBackground,Image} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Input from '../components/Input';
import NewButton from '../components/NewButton';
import LoaderBtn from '../components/LoaderBtn';
import Config from 'react-native-config';

class SignUpScreen extends Component{
    state={
        email:'', password:'',
        fullname:'',
        error:'', signUpMsg:'',
        loading:false, token:''
    }
     
    renderButton(){
        if(this.state.loading){
            return(<LoaderBtn size = 'small' />);
        }
        return(<NewButton onPress={this.onSubmit}>Create</NewButton>);
    }

    onFail = (err) => {this.setState({loading:false, signUpMsg:'Failed to create your account'});}

    onSuccess=(response)=>{
        this.setState({loading:false, signUpMsg:'Account created successfully! Go back and Login'});
        this.setState({token:response});
    }
    
    onSubmit = () => {
        this.setState({loading:true});
        const name=this.state.fullname;
        const email=this.state.email;
        const password=this.state.password;
        const newUser = {
            name,
            email,
            password
        };
        try{
            const body = JSON.stringify(newUser);
            const config = {headers:{'Content-Type':'application/json'}};
            axios.post(Config.USER_API_DEVICE,body,config)
            .then(res =>{this.onSuccess(res.data.token);})
            .catch(err => this.onFail(err));
            
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return(
            <ImageBackground source={require('../images/AuthBack.png')} style={styles.viewStyle}>
                <View style={styles.headerTextStyle}> 
                <View style={{flex:0.5,width:'100%',justifyContent:'center',paddingLeft:20}}>
                    <TouchableHighlight underlayColor={'transparent'} style={{width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:20}} onPress={() => this.props.navigation.navigate('Login')}>
                        <Image style={{width:25,height:25}} source={require('../images/left-arrow.png')} />
                    </TouchableHighlight>
                </View>
                <View style={{flex:0.5,width:'100%',justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={{color:'#BEE4E2',fontSize:30,fontWeight:'bold'}}>
                    Sign up
                    </Text>
                </View>
                </View>
                <View style={styles.cardViewStyle}>
                    <View style={{width:'80%',borderRadius:10.7,height:'90%'}}>
                        <Card>
                            <CardSection>
                                    <Input  
                                    secureTextEntry={false} value={this.state.email} 
                                    onChangeText={(email)=>this.setState({email})}   placeholder="Email" />
                            </CardSection>
                            <CardSection>
                                    <Input  
                                    secureTextEntry={true} value={this.state.password} 
                                    onChangeText={(password)=>this.setState({password})} placeholder="Password" />
                            </CardSection>
                            <CardSection>
                                    <Input  
                                    secureTextEntry={false} value={this.state.fullname}
                                    onChangeText={(fullname)=>this.setState({fullname})}  placeholder="User Name" />
                            </CardSection>
                            <CardSection>
                                {this.renderButton()}
                            </CardSection> 
                            <CardSection>
                                <Text style={{paddingBottom:30,color:'red',alignItems:'center'}}>
                                {this.state.signUpMsg}
                                </Text>
                            </CardSection>    
                        </Card>
                    </View>     
                </View> 
            </ImageBackground>
        );}
}

const styles = StyleSheet.create({
    cardViewStyle:{
        width:'100%',
        flex:0.8,
        flexDirection:'row',
        justifyContent:'center',
     },
    viewStyle:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
   },
   headerTextStyle:{
        alignItems:'center',
        justifyContent:'flex-end',
        width:'100%',
        flex:0.2,
        flexDirection:'column',
},
});

export default SignUpScreen;