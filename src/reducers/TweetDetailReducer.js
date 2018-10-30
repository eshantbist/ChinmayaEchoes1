const initialState = {
  tweet: {},
  gotoScreen:null
}

const TweetDetailReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'TWEET_DETAIL':
    return {
      ...state,
      tweet: action.tweet,
      gotoScreen:action.gotoScreen,
    }

    default:
    return state;
  }
}

export default TweetDetailReducer
