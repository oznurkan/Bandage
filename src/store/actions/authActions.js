import {
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_RESET
} from "../actions/actionTypes";
import api from "../../api/api";


const signupPending = () => ({
  type: SIGNUP_PENDING,
});

const signupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

const signupFailed = (error) => ({
  type: SIGNUP_FAILED,
  payload: error,
});

export const signupReset = () => ({
  type: SIGNUP_RESET,
});



export const signupUser = (userData) => {
  return (dispatch) => {
    dispatch(signupPending());

    return api
      .post("/signup", userData)
      .then((response) => {
        dispatch(signupSuccess(response.data));
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again.";

        dispatch(signupFailed(errorMessage));
        throw error;
      });
  };
};