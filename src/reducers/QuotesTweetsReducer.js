const initialState = {
  tweets: {},
  tweetsAvailable:false,
}

const QuotesTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'QUOTES_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default QuotesTweetsReducer
