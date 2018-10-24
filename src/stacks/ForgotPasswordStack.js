import React from 'react'
import { createStackNavigator } from 'react-navigation';
import ForgotPassword from '../containers/ForgotPassword';

const StackNav = createStackNavigator({
    ForgotPassword: { screen: ForgotPassword },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

class ForgotPasswordStack extends React.Component {

  render() {
    return (
      <StackNav />
    )
  }
}

export default ForgotPasswordStack
