import {AsyncStorage} from 'react-native'

const initialState = {
  tweets: {},
  tweetsAvailable:false,
}

const TweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'ALL_TWEETS':

    return {
      ...state,
      tweetsAvailable:true,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default TweetsReducer
