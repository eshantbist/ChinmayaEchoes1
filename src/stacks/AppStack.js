import React from 'react'
import { createStackNavigator } from 'react-navigation';
import TweetList from '../containers/TweetList';
import TweetDetail from '../components/TweetDetail';
import TweetItem from '../components/TweetItem';

const StackNav = createStackNavigator({
    TweetList: { screen: TweetList },
    TweetDetail: { screen: TweetDetail },
    TweetItem: { screen: TweetItem },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

class AppStack extends React.Component {

  componentDidMount(){

  }

  render() {
    return (
      <StackNav />
    )
  }
}

export default AppStack
