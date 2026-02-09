import {
    SET_CATEGORIES,
    SET_PRODUCT_LIST,
    SET_TOTAL,
    SET_FETCH_STATE,
    SET_LIMIT,
    SET_OFFSET,
    SET_FILTER,
    SET_SELECTED_PRODUCT,
    ADD_TO_FAVORITES
} from "../actions/productActions";

const initialState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    filter: "",
    selectedProduct: null,
    addToFavorites:[],
    fetchState: "NOT_FETCHED", // "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED"
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    case SET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };

    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };

    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    
    case SET_SELECTED_PRODUCT: 
      return { ...state, selectedProduct: action.payload };

    case ADD_TO_FAVORITES:
      if (state.addToFavorites.find(p => p.id === action.payload?.id)) {
        return state;
      }
      return {
        ...state,
        addToFavorites: [...state.addToFavorites, action.payload]
      };
    default:
      return state;
  }
};

export default productReducer;