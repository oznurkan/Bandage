import { GET_DATA_FETCHING, GET_DATA_SUCCESS, GET_DATA_FAILED } from "../actions/actionTypes";

const initialState = {
  content: null,
  loading: false,
  error: null
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_FETCHING:
      return { ...state, loading: true, error: null };
    case GET_DATA_SUCCESS:
      return { ...state, loading: false, content: action.payload };
    case GET_DATA_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};