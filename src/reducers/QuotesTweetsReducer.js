const initialState = {
  tweets: {},
  tweetsAvailable:false,
  emptyQuotesData:false,
}

const QuotesTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'QUOTES_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      emptyQuotesData:false,
      tweets: action.tweets,
    }
    case 'EMPTY_QUOTES_MESSAGE':
    return {
      ...state,
      emptyQuotesData:true,
    }
    default:
    return state;
  }
}

export default QuotesTweetsReducer
