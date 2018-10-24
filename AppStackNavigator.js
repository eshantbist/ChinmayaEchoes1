import React, {Component} from 'react';
import {Button,Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createSwitchNavigator} from 'react-navigation';
import AppStack from './src/stacks/AppStack';
import AuthStack from './src/stacks/AuthStack';
import ForgotPasswordStack from './src/stacks/ForgotPasswordStack';
import config from './src/Utils/aws-exports';
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure(config);
import { connect } from 'react-redux'

class AppStackNavigator extends React.Component {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })

    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user.username) {
      loggedIn = true
    }
    const { ForgotPasswordReducer: {
      forgotPasswordClicked
    }} = this.props

    if(forgotPasswordClicked){
      return <ForgotPasswordStack/>
    }

    if (loggedIn) {
      return (
        <AppStack />
      )
    }
    return (
      <AuthStack />
    )
  }
}

const mapStateToProps = state => ({
  SignInReducer: state.SignInReducer,
  ForgotPasswordReducer:state.ForgotPasswordReducer
})

export default connect(mapStateToProps)(AppStackNavigator)
