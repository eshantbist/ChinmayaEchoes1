import {CLOSE_TWEETS_READMORE,SHOW_READ_MORE,CLOSE_TWEETS_IMAGE,ALL_TWEETS_IMAGE,EVENTS_TWEETS,POSTS_TWEETS,TWEET_DETAIL,QUOTES_TWEETS,VIDEOS_TWEETS,SHOW_OLD_USER_CONFIRMATION_MODAL,CONFIRM_FORGOT_PASSWORD,CONFIRM_USER,FORGOT_PASSWORD,SIGN_IN,SIGN_UP,ALL_TWEETS,SEARCH_TWEETS,LOG_OUT,LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,SHOW_SIGN_UP_CONFIRMATION_MODAL,CONFIRM_SIGNUP,CONFIRM_SIGNUP_SUCCESS,CONFIRM_SIGNUP_FAILURE,} from './actionTypes'
import Amplify, { Auth } from 'aws-amplify';
import config from '../Utils/aws-exports';
import {Alert} from 'react-native';
Amplify.configure(config)
import axios from 'axios';

const uri='https://echoes.staging.chinmayamission.com/wp-json/wp/v2/tweet/';
const quotes_uri='http://echoes.staging.chinmayamission.com/wp-json/wp/v2/categories?slug=quotes';
const posts_uri='http://echoes.staging.chinmayamission.com/wp-json/wp/v2/categories?slug=posts';
const events_uri='http://echoes.staging.chinmayamission.com/wp-json/wp/v2/categories?slug=events';
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

    Auth.signIn( username, password )
    .then( user => {
      Alert.alert('User exists go to Sign In ')
        return Auth.signOut();
    } )

    .catch( err => {
          console.log(err.name)
          if(err.name==='UserNotFoundException')
          {
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
            if(err.name==='UserNotConfirmedException')
            {
              Auth.resendSignUp(username)
                   .then(data => {
                     dispatch(signUpSuccess(data))
                     dispatch(showOldUserConfirmationModal())
                   })
                   .catch(err => {
                     console.log('error signing up: ', err)
                     Alert.alert(err.name || JSON.stringify(err));
                     dispatch(signUpFailure(err))
                   });
              }
        } );

  }
}

export function showSignUpConfirmationModal() {
  return {
    type: SHOW_SIGN_UP_CONFIRMATION_MODAL
  }
}

export function showOldUserConfirmationModal() {
  return {
    type: SHOW_OLD_USER_CONFIRMATION_MODAL
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
        //Alert.alert(err.message || JSON.stringify(err));
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
      const url = `${uri}`;
      let tweets;
      fetch(url)
         .then(response => {
           response.json()
          .then(json => {
             tweets=json;
             dispatch(alltweetlist(tweets))
           })
         })
         .catch();
    }
}

export function videosFilter(id){
    return (dispatch) => {
      const url = `${uri}?categories=${id}`;
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             dispatch(videostweetlist(tweets))
           })
         })
         .catch();
    }
}

export function quotesFilter(id){
    return (dispatch) => {
      const url = `${uri}?categories=${id}`;
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             dispatch(quotestweetlist(tweets))
           })
         })
         .catch();
    }
}

export function postsFilter(id){
    return (dispatch) => {
      const url = `${uri}?categories=${id}`;
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             dispatch(poststweetlist(tweets))
           })
         })
         .catch();
    }
}

export function eventsFilter(id){
    return (dispatch) => {
      const url = `${uri}?categories=${id}`;
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             dispatch(eventstweetlist(tweets))
           })
         })
         .catch();
    }
}

export function searchAll(term){
    return (dispatch) => {
      const TERM=term;
      const url = `${uri}?search=${TERM}`;
      dispatch(searchQuotes(term))
      dispatch(searchPosts(term))
      dispatch(searchEvents(term))
      fetch(url)
         .then(response => {
           response.json().
           then(json => {
             const tweets=json;
             dispatch(alltweetlist(tweets))
           })
         })
         .catch();
    }
}

export function searchQuotes(term){
    return (dispatch) => {
      const category_url=`${quotes_uri}`;
      fetch(category_url)
         .then(response => {
           response.json()
          .then(json => {
             json.map(category=>{
               const id=category.id;
               const TERM=term;
               const url = `${uri}?categories=${id}&search=${TERM}`;
               fetch(url)
                  .then(response => {
                    response.json().
                    then(json => {
                      const tweets=json;
                      dispatch(quotestweetlist(tweets))
                    })
                  })
                  .catch();

             })
           })
         })
         .catch();
    }
}

export function searchPosts(term){
  return (dispatch) => {
    const category_url=`${posts_uri}`;
    fetch(category_url)
       .then(response => {
         response.json()
        .then(json => {
           json.map(category=>{
             const id=category.id;
             const TERM=term;
             const url = `${uri}?categories=${id}&search=${TERM}`;
             fetch(url)
                .then(response => {
                  response.json().
                  then(json => {
                    const tweets=json;
                    dispatch(poststweetlist(tweets))
                  })
                })
                .catch();

           })
         })
       })
       .catch();
  }
}

export function searchEvents(term){
  return (dispatch) => {
    const category_url=`${events_uri}`;
    fetch(category_url)
       .then(response => {
         response.json()
        .then(json => {
           json.map(category=>{
             const id=category.id;
             const TERM=term;
             const url = `${uri}?categories=${id}&search=${TERM}`;
             fetch(url)
                .then(response => {
                  response.json().
                  then(json => {
                    const tweets=json;
                    dispatch(eventstweetlist(tweets))
                  })
                })
                .catch();

           })
         })
       })
       .catch();
  }
}

function alltweetlist(tweets){
  return{
    type:ALL_TWEETS,
    tweets
  };
}

export function imageModal(image,tweet){
  return{
    type:ALL_TWEETS_IMAGE,
    image:image,
    tweet:tweet,
  };
}

export function closeImageModal(){
  return{
    type:CLOSE_TWEETS_IMAGE,
  };
}

export function showReadMoreModal(){
  return{
    type:SHOW_READ_MORE,
  };
}

export function closeReadMoreModal(){
  return{
    type:CLOSE_TWEETS_READMORE,
  };
}

function videostweetlist(tweets){
  return{
    type:VIDEOS_TWEETS,
    tweets
  };
}

function quotestweetlist(tweets){
  return{
    type:QUOTES_TWEETS,
    tweets
  };
}

function poststweetlist(tweets){
  return{
    type:POSTS_TWEETS,
    tweets
  };
}

function eventstweetlist(tweets){
  return{
    type:EVENTS_TWEETS,
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

export function tweetDetail(tweet,gotoScreen){
  return{
    type:TWEET_DETAIL,
    tweet:tweet,
    gotoScreen:gotoScreen,
  }
}
