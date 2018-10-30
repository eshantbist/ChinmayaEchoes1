import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import SignUpReducer from './SignUpReducer';
import AllTweetsReducer from './AllTweetsReducer';
import VideosTweetsReducer from './VideosTweetsReducer';
import QuotesTweetsReducer from './QuotesTweetsReducer';
import ForgotPasswordReducer from './ForgotPasswordReducer';
import TweetDetailReducer from './TweetDetailReducer';
import PostsTweetsReducer from './PostsTweetsReducer';

const rootReducer= combineReducers({
  SignInReducer,
  SignUpReducer,
  AllTweetsReducer,
  QuotesTweetsReducer,
  VideosTweetsReducer,
  ForgotPasswordReducer,
  TweetDetailReducer,
  PostsTweetsReducer,

})

export default rootReducer;
