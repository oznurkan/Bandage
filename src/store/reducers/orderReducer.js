import {
  SET_ORDER_LIST,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
} from "../actions/actionTypes";

const initialState = {
  orderList: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
        loading: false,
        error: null,
      };

    case SET_ORDER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
