import React from 'react'
import { createMaterialTopTabNavigator,createSwitchNavigator,createStackNavigator } from 'react-navigation';
import { SafeAreaView,Text, View} from 'react-native';
import LogOutHeader from '../containers/LogOutHeader';
import AllTweetList from '../containers/AllTweetList';
import QuotesTweetList from '../containers/QuotesTweetList';
import VideosTweetList from '../containers/VideosTweetList';
import PostsTweetList from '../containers/PostsTweetList';
import EventsTweetList from '../containers/EventsTweetList';
import TweetDetail from '../components/TweetDetail';

const AppStackNav = createStackNavigator({
    TweetDetail: { screen: TweetDetail },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

const MenuStackNav = createMaterialTopTabNavigator({
    All: { screen: AllTweetList },
    Quotes: { screen: QuotesTweetList },
    Posts: { screen: PostsTweetList },
    Events: { screen: EventsTweetList },
  },
{
  tabBarOptions: {
    labelStyle: {
      fontSize:9,
      fontWeight:'900',
    },
    style: {
      backgroundColor: '#999999',
    },
    indicatorStyle:{
      height:5,
      backgroundColor:'black'
    }
}
});


const StackNav=createSwitchNavigator(
  {
    Menu: MenuStackNav,
    App: AppStackNav,
  },
  {
    initialRouteName: 'Menu',
  }
);
class MenuStack extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <LogOutHeader/>
        <StackNav />
      </SafeAreaView>
    )
  }
}

export default MenuStack
