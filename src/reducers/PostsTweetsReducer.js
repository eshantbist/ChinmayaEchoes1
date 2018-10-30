const initialState = {
  tweets: {},
  tweetsAvailable:false,
}

const PostsTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'POSTS_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default PostsTweetsReducer
