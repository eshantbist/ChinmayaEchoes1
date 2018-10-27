const initialState = {
  tweet: {},
}

const TweetDetailReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'TWEET_DETAIL':
    console.log('Inside tweet detail');
    return {
      ...state,
      tweet: action.tweet,
    }

    default:
    return state;
  }
}

export default TweetDetailReducer
