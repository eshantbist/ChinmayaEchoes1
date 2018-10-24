const signUpInitialState = {
  isAuthenticating: false,
  user: {},
  signUpError: false,
  showSignUpConfirmationModal: false,
  confirmSignUpError: false,
  signUpErrorMessage: '',
  confirmSignUpErrorMessage: ''
}
const SignUpReducer=(state=signUpInitialState,action)=>{
  switch (action.type) {
      case 'SHOW_SIGN_UP_CONFIRMATION_MODAL':
      return {
        ...state,
        isAuthenticating: false,
        showSignUpConfirmationModal: true
      }
    case 'CONFIRM_SIGNUP':
      return {
        ...state,
        isAuthenticating: true
      }
    case 'CONFIRM_SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticating: false,
        showSignUpConfirmationModal: false
      }
    case 'CONFIRM_SIGNUP_FAILURE':
      return {
        ...state,
        isAuthenticating: false,
        confirmSignUpError: false,
        confirmSignupErrorMessage: action.error.message
      }
    case 'SIGN_UP':
      return {
        ...state,
        isAuthenticating: true,
      }
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        isAuthenticating: false
      }
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.error.message
      }
    default:
      return state
  }
}

export default SignUpReducer
