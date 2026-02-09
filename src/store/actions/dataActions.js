import axios from "axios";
import { GET_DATA_FETCHING, GET_DATA_SUCCESS, GET_DATA_FAILED } from "./actionTypes";

export const getDataFetching = () => ({ type: GET_DATA_FETCHING });
export const getDataSuccess = (data) => ({ type: GET_DATA_SUCCESS, payload: data });
export const getDataFailed = (error) => ({ type: GET_DATA_FAILED, payload: error });


export const getDataInfo = () => {
  return (dispatch) => {
    dispatch(getDataFetching()); 

    return axios.get("/data.json")
      .then((response) => {
        dispatch(getDataSuccess(response.data)); 
      })
      .catch((error) => {
        const errorMsg = error.message || "Bilinmeyen bir hata oluştu.";
        dispatch(getDataFailed(errorMsg)); 
      });
  };
};