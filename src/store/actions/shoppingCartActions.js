export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const { shoppingCart } = getState();
    const existingItem = shoppingCart.cart.find(
      (item) => item.product.id === product.id
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = shoppingCart.cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item
      );
    } else {
      updatedCart = [...shoppingCart.cart, { count: 1, product }];
    }

    dispatch(setCart(updatedCart));
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    const { shoppingCart } = getState();
    const updatedCart = shoppingCart.cart.filter(
      (item) => item.product.id !== productId
    );
    dispatch(setCart(updatedCart));
  };
};


export const updateCartItemCount = (productId, count) => {
  return (dispatch, getState) => {
    const { shoppingCart } = getState();

    if (count <= 0) {
      dispatch(removeFromCart(productId));
      return;
    }

    const updatedCart = shoppingCart.cart.map((item) =>
      item.product.id === productId ? { ...item, count } : item
    );
    dispatch(setCart(updatedCart));
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch(setCart([]));
  };
};