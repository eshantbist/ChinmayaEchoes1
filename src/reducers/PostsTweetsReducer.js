const initialState = {
  tweets: null,
}

const PostsTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'POSTS_TWEETS':
    return {
      ...state,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default PostsTweetsReducer
