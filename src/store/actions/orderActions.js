import {
  SET_ORDER_LIST,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
} from "./actionTypes";
import api from "../../api/api";

export const setOrderList = (orders) => ({
  type: SET_ORDER_LIST,
  payload: orders,
});

export const setOrderLoading = (loading) => ({
  type: SET_ORDER_LOADING,
  payload: loading,
});

export const setOrderError = (error) => ({
  type: SET_ORDER_ERROR,
  payload: error,
});

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(setOrderLoading(true));

    return api
      .get("/order")
      .then((response) => {
        console.log("Orders fetched:", response.data);
        dispatch(setOrderList(response.data));
        return response.data;
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch orders";
        dispatch(setOrderError(errorMessage));
        throw error;
      });
  };
};