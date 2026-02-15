import api from "../../api/api";
import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  CLEAR_CART,
} from "./actionTypes";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { product },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});

export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count },
});

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: { productId },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const createOrderAction = (orderData) => async (dispatch, getState) => {
  const { shoppingCart } = getState();

  const orderPayload = {
    address_id: shoppingCart.address.id,
    order_date: new Date().toISOString().split(".")[0],
    card_no: shoppingCart.payment.card_no,
    card_name: shoppingCart.payment.name_on_card,
    card_expire_month: Number(shoppingCart.payment.expire_month),
    card_expire_year: Number(shoppingCart.payment.expire_year),
    card_ccv: orderData.card_ccv || 321,
    price: orderData.grandTotal,
    products: shoppingCart.cart
      .filter((item) => item.checked)
      .map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: `${item.product.name} - ${item.product.description.substring(0, 20)}`,
      })),
  };
  try {
    const response = await api.post("/order", orderPayload);
    console.log(
      "Store'dan alınan verilerle sipariş oluşturuldu:",
      response.data,
    );

    dispatch(clearCart());

    return response;
  } catch (error) {
    console.error("Sipariş hatası:", error);
    throw error;
  }
};
