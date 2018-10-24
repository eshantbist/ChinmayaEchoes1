const initialState = {
  forgotPasswordClicked: false,
  showForgotPasswordModal:false,
}

const ForgotPasswordReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'FORGOT_PASSWORD':
      return {
        ...state,
        forgotPasswordClicked: true,
        showForgotPasswordModal:false,
      }
    case 'CONFIRM_USER':
      return{
        ...state,
        showForgotPasswordModal:true,
      }
    case 'CONFIRM_FORGOT_PASSWORD':
      return{
        ...state,
        forgotPasswordClicked: false,
        showForgotPasswordModal:false,
      }
    default:
      return state
  }
}

export default ForgotPasswordReducer;
