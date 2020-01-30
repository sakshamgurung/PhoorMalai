import React,{Component} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import {useScreens} from 'react-native-screens';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import MapWrap from './screens/MapWrap';
import Current from './screens/Current';
import History from './screens/History'; 
import Customer from './screens/Customer';
import Collector from './screens/Collector';
import MainForm from './screens/MainForm';
import Info from './screens/Info';
import HowTo from './screens/HowTo';
import RecycleInfo from './screens/RecycleInfo';
import UnrecycleInfo from './screens/UnrecycleInfo';
import OrganicInfo from './screens/OrganicInfo';
import Other from './screens/Other';

import MenuButton from '../src/components/MenuButton';
import BackToMapButton from '../src/components/BackToMapButton';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

useScreens();
const {width} = Dimensions.get('window');
const Auth = createStackNavigator({
  //Welcome: WelcomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen
},{
  defaultNavigationOptions:{
    header:null
  }
}
);

const ProfileStackNav= createStackNavigator({
  Profile:{
    screen:Profile,
    navigationOptions:({navigation})=>({
        headerTransparent:{
            position:'absolute',
            backgroundColor: 'transparent',
            zIndex:100,
            top:0,
            left:0,
            right:0
        },
        headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
},{
  navigationOptions:{
    drawerLabel:'Profile',
    drawerIcon:({tintColor})=>(
      <MaterialIcon name='account-box' size={5} style={{fontSize:24, color:tintColor}}/>
    )
  }
});

const MapStackNav= createStackNavigator({
  Map:{
    screen:MapWrap,
    navigationOptions:({navigation})=>({
        headerTransparent:{
            position:'absolute',
            backgroundColor: 'transparent',
            zIndex:100,
            top:0,
            left:0,
            right:0
        },
        headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
});

const HistoryStackNav= createStackNavigator({
  History:{
    screen:History
  }
},{
  navigationOptions:{
    drawerLabel:'History',
    drawerIcon:({tintColor})=>(
      <SimpleLineIcon name="graph" size={5} style={{fontSize:24, color:tintColor}}/>
    )
  }
});

const CurrentStackNav= createStackNavigator({
  Current:{
    screen:Current
  }
},{
  navigationOptions:{
    drawerLabel:'Current',
    drawerIcon:({tintColor})=>(
      <EntypoIcon name="line-graph" size={5} style={{fontSize:24, color:tintColor}}/>
    )
  }
})
const CustomerStackNav= createStackNavigator({
  Customer:{
    screen:Customer,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const CollectorStackNav= createStackNavigator({
  Collector:{
    screen:Collector,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})

const FormStackNav = createStackNavigator({
  Form:{
    screen:MainForm,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const InfoStackNav = createStackNavigator({
  Info:{
    screen:Info,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const HowToStackNav = createStackNavigator({
  HowTo:{
    screen:HowTo,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const RecycleStackNav = createStackNavigator({
  RecycleInfo:{
    screen:RecycleInfo,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const UnrecycleStackNav = createStackNavigator({
  UnrecycleInfo:{
    screen:UnrecycleInfo,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const OrganicStackNav = createStackNavigator({
  OrganicInfo:{
    screen:OrganicInfo,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})
const OtherStackNav = createStackNavigator({
  Other:{
    screen:Other,
    navigationOptions:({navigation})=>({
        headerTransparent:{
          position:'absolute',
          backgroundColor: 'transparent',
          zIndex:100,
          top:0,
          left:0,
          right:0
      },
      headerLeft:<MenuButton navigationProps={navigation} />
    })
  }
})

const Main = createStackNavigator({
  MapScreen: MapStackNav,
  FormScreen: FormStackNav,
  CustomerScreen: CustomerStackNav,
  CollectorScreen: CollectorStackNav
},{
  initialRouteName:"MapScreen",
  defaultNavigationOptions:{
    header:null
  },
  navigationOptions:{
    drawerLabel:'Map',
    drawerIcon:({tintColor})=>(
      <MaterialCommunityIcon name="dump-truck" size={5} style={{fontSize:24, color:tintColor}}/>
    )
  }
})
const MainInfo = createStackNavigator({
  InfoScreen: InfoStackNav,
  HowToScreen: HowToStackNav,
  RecycleScreen:RecycleStackNav,
  UnrecycleScreen:UnrecycleStackNav,
  OrganicScreen:OrganicStackNav,
  OtherScreen:OtherStackNav
},{
  initialRouteName:"InfoScreen",
  defaultNavigationOptions:{
    header:null
  },
  navigationOptions:{
    drawerLabel:'Info',
    drawerIcon:({tintColor})=>(
      <AntDesignIcon name="infocirlce" size={5} style={{fontSize:24, color:tintColor}}/>
    )
  }
})

const CustomDrawerComponent = (props)=>{
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={{backgroundColor:'#fff',alignItems:'center', justifyContent:'center',marginBottom:10}}>
        <MaterialIcon name='account-box' size={50} color={'#2196f3'}/>
      </View>
      <View style={{backgroundColor:'#fff'},{flexDirection:'row'}}>
        <AntDesignIcon name="logout" size={15} color="#fff" style={{marginLeft:20, paddingTop:3}}/>
        <TouchableOpacity 
        onPress={()=>{
          AsyncStorage.clear();
          props.navigation.navigate('Login')} 
        }>
          <Text style={{marginLeft:35,fontSize:15,fontWeight:'bold',color:"#fff"}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <DrawerNavigatorItems {...props}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const DrawerNav = createDrawerNavigator({
  ProfileDrawer: ProfileStackNav,
  InfoDrawer: MainInfo,
  MapDrawer: Main,
  CurrentDrawer: CurrentStackNav,
  HistoryDrawer: HistoryStackNav,
},{
  initialRouteName:"CurrentDrawer",
  contentComponent:CustomDrawerComponent,
  drawerWidth:width*0.7,
  drawerBackgroundColor:"#2196f3",
  contentOptions:{
    activeTintColor:'#e3f2fd',
    inactiveTintColor:'#fff',
    labelStyle:{
      fontSize:15
    }
  }
});

const Switch = createSwitchNavigator({
  // Auth: Auth,
  MainFlow: DrawerNav
});

//const AppContainer = createAppContainer(DrawerNav);
const AppContainer = createAppContainer(Switch);
class Router extends Component{
  render(){
    return(<AppContainer />);
  }
}

export default Router;