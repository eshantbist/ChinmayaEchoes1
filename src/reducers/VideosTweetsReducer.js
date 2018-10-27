const initialState = {
  tweets: null,
  isVideo:false,
}

const VideosTweetsReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'VIDEOS_TWEETS':
    return {
      ...state,
      tweets: action.tweets,
      isVideo:true,
    }

    default:
    return state;
  }
}

export default VideosTweetsReducer
