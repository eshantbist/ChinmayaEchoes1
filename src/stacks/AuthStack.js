import React from 'react'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';

const StackNav = createMaterialBottomTabNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions:{
        tabBarLabel:'Sign In',
        tabBarIcon:({tintColor})=>(
           <FontAwesome name={'sign-in'} color={'white'} size={22}/>
        )
      }
    },
    Register: {
      screen: SignUp,
      navigationOptions:{
        tabBarLabel:'Register',
        tabBarIcon:({tintColor})=>(
           <FontAwesome name={'user-plus'} color={'white'} size={22}/>
        )
      }
    },
  },
  {
    initialRouteName:'SignIn',
    activeTintColor:'white',
  }
);

class AuthStack extends React.Component {
  render() {
    return (
      <StackNav />
    )
  }
}

export default AuthStack
