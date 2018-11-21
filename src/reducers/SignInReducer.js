const initialState = {
  isAuthenticating: false,
  user: {},
  signInError: false,
  signInErrorMessage: '',
  showLoadingModel:false,
}

const SignInReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticating: true,
        signInError: false,
        showLoadingModel:true,
      }
    case 'LOG_IN_SUCCESS':
      return {
        signInErrorMessage: '',
        isAuthenticating: false,
        user: action.user,
        showLoadingModel:false,
      }
    case 'LOG_IN_FAILURE':
      console.log('failed')
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error.message,
        showLoadingModel:false,
      }
    case 'LOG_OUT':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default SignInReducer;
