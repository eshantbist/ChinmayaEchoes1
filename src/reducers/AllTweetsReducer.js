const initialState = {
  tweets: null,
}

const TweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'ALL_TWEETS':
    return {
      ...state,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default TweetsReducer
