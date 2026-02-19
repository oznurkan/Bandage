import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  CLEAR_CART,
  SET_INSTALLMENT
} from "../actions/actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
  installment: 1,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART: {
      const { product } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, count: item.count + 1 }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { count: 1, checked: true, product }],
        };
      }
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== productId),
      };
    }

    case UPDATE_CART_ITEM: {
      const { productId, count } = action.payload;

      if (count <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.product.id !== productId),
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, count } : item,
        ),
      };
    }

    case TOGGLE_CART_ITEM: {
      const { productId } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId
            ? { ...item, checked: !item.checked }
            : item,
        ),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    case SET_INSTALLMENT:
      return { ...state, installment: action.payload };

    default:
      return state;
  }
};

export default shoppingCartReducer;
