const initialState = {
  isVideo:false,
  tweets: {},
  tweetsAvailable:false,
}

const VideosTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'VIDEOS_TWEETS':
    return {
      ...state,
      tweetsAvailable:true,
      tweets: action.tweets,
      isVideo:true,
    }

    default:
    return state;
  }
}

export default VideosTweetsReducer
