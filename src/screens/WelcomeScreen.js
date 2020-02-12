import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import Slides from '../components/Slides';

const DATA_SLIDES=[
    {text:"welcome to PM",color:'#03A9F4'},
    {text:"Follow these guidelines",color:'#009688'},
    {text:"are you ready to logIn" ,color:'#03a9f4'}
]

class WelcomeScreen extends Component{

    onComplete=()=>{
        this.props.navigation.navigate('Login'); 
    }

    render()
    {
        return(
           <Slides data={DATA_SLIDES} onComplete={()=>this.onComplete} />
        );
    }
}

export default WelcomeScreen;