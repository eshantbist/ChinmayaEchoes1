const initialState = {
  tweets: null,
}

const QuotesTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'QUOTES_TWEETS':
    return {
      ...state,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default QuotesTweetsReducer
