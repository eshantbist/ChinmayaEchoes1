import {CONFIRM_FORGOT_PASSWORD,CONFIRM_USER,FORGOT_PASSWORD,SIGN_IN,SIGN_UP,ALL_TWEETS,SEARCH_TWEETS,LOG_OUT,LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,SHOW_SIGN_UP_CONFIRMATION_MODAL,CONFIRM_SIGNUP,CONFIRM_SIGNUP_SUCCESS,CONFIRM_SIGNUP_FAILURE,} from './actionTypes'
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {Alert} from 'react-native';
Amplify.configure(config)
import axios from 'axios';

function logIn() {
  return {
    type: LOG_IN
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,
    error: err
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}

export function authenticate(username, password) {
  return (dispatch) => {
    dispatch(logIn())
    Auth.signIn(username, password)
      .then(user => {
        dispatch(logInSuccess(user))
      })
      .catch(err => {
        console.log('errror from signIn: ', err)
        dispatch(logInFailure(err))
      });
  }
}


function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err
  }
}

export function createUser(username, password, email, phone_number) {
  return (dispatch) => {
    dispatch(signUp())
    let phone
    const firstTwoDigits = phone_number.substring(0, 2)
    if (firstTwoDigits === '+1') {
      phone = phone_number
    } else {
      phone = '+1' + phone_number
    }
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: phone
      }
    })
    .then(data => {
      console.log('data from signUp: ', data)
      dispatch(signUpSuccess(data))
      dispatch(showSignUpConfirmationModal())
    })
    .catch(err => {
      console.log('error signing up: ', err)
      dispatch(signUpFailure(err))
    });
  }
}

export function showSignUpConfirmationModal() {
  return {
    type: SHOW_SIGN_UP_CONFIRMATION_MODAL
  }
}

export function confirmUserSignUp(username, authCode) {
  return (dispatch) => {
    dispatch(confirmSignUp())
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        console.log('data from confirmSignUp: ', data)
        dispatch(confirmSignUpSuccess())
        setTimeout(() => {
          Alert.alert('Successfully Signed Up!', 'Please Sign')
        }, 0)
      })
      .catch(err => {
        Alert.alert(err.message || JSON.stringify(err));
        dispatch(confirmSignUpFailure(err))
      });
  }
}

function confirmSignUp() {
  return {
    type: CONFIRM_SIGNUP
  }
}

function confirmSignUpSuccess() {
  return {
    type: CONFIRM_SIGNUP_SUCCESS
  }
}

function confirmSignUpFailure(error) {
  return {
    type: CONFIRM_SIGNUP_FAILURE,
    error
  }
}

export function fetchtweets(){
    return (dispatch) => {
      const url = `https://staging.chinmayamission.com/wp-json/gcmw/v1/tweet/search`;
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             dispatch(tweetlist(tweets))
           })
         })
         .catch();
    }
}

export function filter(term,filter){
    return (dispatch) => {
      const TERM=term;
      const FILTER=filter;
      const url = `https://staging.chinmayamission.com/wp-json/gcmw/v1/tweet/search?term=${TERM}&category=${FILTER}`;
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             console.log(tweets);
             dispatch(tweetlist(tweets))
           })
         })
         .catch();
    }
}

function tweetlist(tweets){
  return{
    type:ALL_TWEETS,
    tweets
  };
}

export function onForgotPasswordClick(){
  return{
    type:FORGOT_PASSWORD,
  }
}

export function userForgotPassword(username){
  return (dispatch) => {
    Auth.forgotPassword(username)
      .then(data =>
        dispatch(confirmUser())
      )
      .catch(err => {
        Alert.alert('Username not Found');
      });
  }
}

function confirmUser(){
  return{
    type:CONFIRM_USER,
  }
}

export function confirmForgotPassword(username,code,new_password){
  return (dispatch) => {
    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data =>
      {
        dispatch(confirmForgotPasswordSuccess())
        setTimeout(() => {
          Alert.alert('Successfully Changed Password', 'Please Sign')
        }, 0)
    })
    .catch(err => {
      Alert.alert(err.message || JSON.stringify(err));
    });
  }
}

function confirmForgotPasswordSuccess(){
  return{
    type:CONFIRM_FORGOT_PASSWORD,
  }
}

export function cancelForgotPassword(){
  return{
    type:CONFIRM_FORGOT_PASSWORD,
  }
}

export function closeSignUpModal() {
  return {
    type: CONFIRM_SIGNUP_SUCCESS
  }
}
