import {AsyncStorage} from 'react-native'

const initialState = {
  tweets: {},
  tweetsAvailable:false,
  imageModalVisibility:false,
  readMoreModalVisibility:false,
  image:null,
  tweet:{},
  emptyAllData:false,
}

const TweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'ALL_TWEETS':

    return {
      ...state,
      tweetsAvailable:true,
      emptyAllData:false,
      tweets: action.tweets,
    }
    case 'ALL_TWEETS_IMAGE':
    return {
      ...state,
      imageModalVisibility:true,
      image: action.image,
      tweet:action.tweet,
    }

    case 'SHOW_READ_MORE':
    return {
      ...state,
      imageModalVisibility:false,
      readMoreModalVisibility:true,
    }

    case 'CLOSE_TWEETS_IMAGE':
    return {
      ...state,
      imageModalVisibility:false,
    }

    case 'CLOSE_TWEETS_READMORE':
    return {
      ...state,
      readMoreModalVisibility:false,
    }
    case 'EMPTY_ALL_MESSAGE':
    return {
      ...state,
      emptyAllData:true,
    }

    default:
    return state;
  }
}

export default TweetsReducer
