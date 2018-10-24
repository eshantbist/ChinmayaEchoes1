const initialState = {
  isAuthenticating: false,
  user: {},
  signInError: false,
  signInErrorMessage: '',
}

const SignInReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticating: true,
        signInError: false
      }
    case 'LOG_IN_SUCCESS':
      return {
        isAuthenticating: false,
        user: action.user,
      }
    case 'LOG_IN_FAILURE':
      console.log('failed')
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error.message
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
