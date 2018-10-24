import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import SignUpReducer from './SignUpReducer';
import TweetsReducer from './TweetsReducer';
import ForgotPasswordReducer from './ForgotPasswordReducer';

const rootReducer= combineReducers({
  SignInReducer,
  SignUpReducer,
  TweetsReducer,
  ForgotPasswordReducer,
})

export default rootReducer;
