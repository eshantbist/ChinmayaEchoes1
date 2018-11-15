const initialState = {
  tweets: {},
  tweetsAvailable:false,
}

const EventsTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'EVENTS_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      tweets: action.tweets,
    }

    default:
    return state;
  }
}

export default EventsTweetsReducer
