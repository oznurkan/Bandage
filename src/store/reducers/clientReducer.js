import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_CREDIT_CARDS,
  ADD_CREDIT_CARD,
  UPDATE_CREDIT_CARD,
  DELETE_CREDIT_CARD,
} from "../actions/actionTypes";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload,
      };

    case ADD_ADDRESS:
      return {
        ...state,
        addressList: [...state.addressList, action.payload],
      };

    case UPDATE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr,
        ),
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(
          (addr) => addr.id !== action.payload,
        ),
      };
    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload };

    case ADD_CREDIT_CARD:
      return { ...state, creditCards: [...state.creditCards, action.payload] };

    case UPDATE_CREDIT_CARD:
      return {
        ...state,
        creditCards: state.creditCards.map((card) =>
          card.id === action.payload.id ? action.payload : card,
        ),
      };
    case DELETE_CREDIT_CARD:
      return {
        ...state,
        creditCards: state.creditCards.filter(
          (card) => card.id !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export default clientReducer;
