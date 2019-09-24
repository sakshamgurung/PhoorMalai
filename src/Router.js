import React,{Component} from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {useScreens} from 'react-native-screens';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import MapWrap from './screens/MapWrap';
import Current from './screens/Current';
import History from './screens/History';
import Customer from './screens/Customer';
import Collector from './screens/Collector';
import MainForm from './screens/MainForm';

import MenuButton from '../src/components/MenuButton';


useScreens();

const Auth = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
  Login: LoginScreen
},{
  defaultNavigationOptions:{
    header:null
  }
}
);

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
    screen:History,
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

const CurrentStackNav= createStackNavigator({
  Current:{
    screen:Current,
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

const FormNav = createStackNavigator({
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

const DrawerNav = createDrawerNavigator({
  MapDrawer: MapStackNav,
  CurrentDrawer: CurrentStackNav,
  HistoryDrawer: HistoryStackNav,
  FormDrawer: FormNav,
  CustomerDrawer: CustomerStackNav,
  CollectorDrawer: CollectorStackNav,
});

// const Switch = createSwitchNavigator({
//   Auth: Auth,
//   Main: DrawerNav
// });




const AppContainer = createAppContainer(DrawerNav);
//const AppContainer = createAppContainer(FormNav);
class Router extends Component{
  render(){
    return(<AppContainer />);
  }
}

export default Router;