import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,PermissionsAndroid,Platform} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, resetState} from '../actions';
import Input from '../components/Input';
import NewButton from '../components/NewButton';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import LoaderBtn from '../components/LoaderBtn';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

class LoginScreen extends Component{
    componentWillUnmount(){
        this.props.resetState();
    }
    state = {
        errorLogin:'',
        loadingLogin:false,
        loginMsg:'',
        hasMapPermission:false
    }

    renderButton(){
        if(this.state.loadingLogin) {return(<LoaderBtn size = 'small' />);}
        return(<NewButton onPress={this.onLoginReq.bind(this)} style={{ width:60,marginTop:30}}>Login</NewButton>);
    }

    onSuccessSignIn = async(res) => {
        const{email} = this.props;
        const token = res.data.token;
        await AsyncStorage.setItem('token',token);
        await AsyncStorage.setItem('email',email);
        this.setState({loadingLogin:false,loginMsg:''});
        this.props.navigation.navigate('MapDrawer');
    }

    onFailSignIn(){
        this.setState({loadingLogin:false,loginMsg:'Failed to Login'})
    }

    onLoginReq(){  
        this.setState({loadingLogin:true});
        const {email, password} = this.props;
        const user = {
            email,
            password
        };
        try{
            const body = JSON.stringify(user);
            const config = {headers:{'Content-Type':'application/json'}};
            axios.post(Config.AUTH_API,body,config)
            .then((res) => this.onSuccessSignIn(res))
            .catch(() => {this.onFailSignIn()});
            
        }catch(err){this.onFailSignIn()}
    }
        
    onEmailChanged(text){
        this.props.emailChanged(text);
    }
      
    onPasswordChanged(text){
        this.props.passwordChanged(text);
    }
    render(){
        return(
        <ImageBackground source={require('../images/AuthBack.png')} style={styles.viewStyle}>
            <View style={styles.headerTextStyle}> 
                <Text style={{color:'#BEE4E2',fontSize:30,fontWeight:'bold'}}>
                    Login!
                </Text>
            </View> 
            <View style={styles.cardViewStyle}>
                 <View style={{width:'80%',borderRadius:10.7,height:'90%'}}>
                      <Card>
                        <CardSection>
                            <Input
                            onChangeText={this.onEmailChanged.bind(this)} 
                            value={this.props.email} 
                            secureTextEntry={false}
                            placeholder="Email" />
                        </CardSection>
                        <CardSection>
                             <Input
                             onChangeText={this.onPasswordChanged.bind(this)}  
                             value={this.props.password} 
                             secureTextEntry={true} 
                             placeholder="Password" />
                        </CardSection>
                        <CardSection>
                          {this.renderButton()}
                        </CardSection> 
                        <CardSection>
                            <Text style={{color:'#d32f2f',fontSize:15, alignItems:'center'}}>
                            {this.state.loginMsg}
                            </Text>
                        </CardSection>    
                        <CardSection> 
                            <Text 
                            style={{ backgroundColor:'#BEE4E2',marginTop:15,fontSize:20,marginBottom:40,color:'#8e8e8e'}}>
                                Dont have account ?
                                <Text 
                                style={{color:'#1282B0'}} 
                                onPress={()=>this.props.navigation.navigate('SignUp')}>Signup
                                </Text>
                            </Text>
                        </CardSection>  
                       </Card>
                  </View>     
            </View>
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    cardViewStyle:{
       width:'100%',
       flex:0.7,
       flexDirection:'row',
       justifyContent:'center',
    },
    headerTextStyle:{
        alignItems:'center',
        justifyContent:'flex-end',
        width:'100%',
        flex:0.3,
   },
    viewStyle:{    
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
   }
});

const mapStateToProps = (state) => {
    const{
      email,
      password
    } = state.auth;
    return{
      email,
      password
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    resetState
})(LoginScreen);