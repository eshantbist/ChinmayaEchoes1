const initialState = {
  tweets: {},
  tweetsAvailable:false,
  emptyEventsData:false,
}

const EventsTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'EVENTS_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      emptyEventsData:false,
      tweets: action.tweets,
    }
    case 'EMPTY_EVENTS_MESSAGE':
    return {
      ...state,
      emptyEventsData:true,
    }

    default:
    return state;
  }
}

export default EventsTweetsReducer
