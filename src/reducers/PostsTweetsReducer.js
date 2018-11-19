const initialState = {
  tweets: {},
  tweetsAvailable:false,
  emptyPostsData:false,
}

const PostsTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'POSTS_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      emptyPostsData:false,
      tweets: action.tweets,
    }

    case 'EMPTY_POSTS_MESSAGE':
    return {
      ...state,
      emptyPostsData:true,
    }

    default:
    return state;
  }
}

export default PostsTweetsReducer
