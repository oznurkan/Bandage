import {
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_RESET
} from "../actions/actionTypes";

const initialState = {
  data:{},
  signupLoading: false,
  signupError: null,
  signupSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_PENDING:
      return {
        ...state,
        signupLoading: true,
        signupError: null,
        signupSuccess: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupError: null,
        signupSuccess: true,
        data: action.payload
      };

    case SIGNUP_FAILED:
      return {
        ...state,
        signupLoading: false,
        signupError: action.payload,
        signupSuccess: false,
      };

    case SIGNUP_RESET:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;