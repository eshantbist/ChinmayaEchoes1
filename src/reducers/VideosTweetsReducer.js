const initialState = {
  isVideo:false,
  tweets: {},
  tweetsAvailable:false,
  emptyVideosData:false,
}

const VideosTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'VIDEOS_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      tweets: action.tweets,
      emptyVideosData:false,
      isVideo:true,
    }

    case 'EMPTY_VIDEOS_MESSAGE':
    return {
      ...state,
      emptyVideosData:true,
    }

    default:
    return state;
  }
}

export default VideosTweetsReducer
