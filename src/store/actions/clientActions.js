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
} from "./actionTypes";

import api from "../../api/api";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRoles = () => {
  return (dispatch, getState) => {
    const { client } = getState();

    if (client.roles && client.roles.length > 0) {
      console.log("Roles already exist in store, skipping fetch");
      return Promise.resolve(client.roles);
    }
    return api
      .get("/roles")
      .then((response) => {
        dispatch(setRoles(response.data));
        return response.data;
      })
      .catch((error) => {
        console.error("Failed to fetch roles:", error);
        throw error;
      });
  };
};

export const loginUser = (credentials, rememberMe = false) => {
  return (dispatch) => {
    return api
      .post("/login", credentials)
      .then((response) => {
        const data = response.data;
        if (rememberMe && data.token) {
          localStorage.setItem("token", data.token);
        }
        api.defaults.headers.common["Authorization"] = data.token;
        dispatch(setUser(data));

        return data;
      })
      .catch((error) => {
        console.error("Login failed:", error);
        throw error;
      });
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found in localStorage");
      return Promise.resolve(null);
    }
    api.defaults.headers.common["Authorization"] = token;

    try {
      const response = await api.get("/verify");
      const data = response.data;

      console.log("Token verified, user logged in:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        api.defaults.headers.common["Authorization"] = data.token;
      }
      dispatch(setUser(data));
      return data;
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      dispatch(setUser({}));

      return null;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser({}));
  };
};

export const getAddresses = () => async (dispatch) => {
  try {
    const res = await api.get("/user/address");

    dispatch({ type: SET_ADDRESS_LIST, payload: res.data });
    return res.data;
  } catch (error) {
    console.error("Adres çekme hatası:", error);
  }
};

export const addNewAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.post("/user/address", addressData);
    const newAddressFromServer = response.data[0] || response.data;
    dispatch({ type: ADD_ADDRESS, payload: newAddressFromServer });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAddressAction = (addressData) => async (dispatch) => {
  try {
    const res = await api.put("/user/address", addressData);
    dispatch({ type: UPDATE_ADDRESS, payload: addressData });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteAddressAction = (addressId) => async (dispatch) => {
  try {
    const response = await api.delete(`/user/address/${addressId}`);
    dispatch({ type: DELETE_ADDRESS, payload: addressId });
    console.log(response);
  } catch (err) {
    console.error("Silme hatası:", err);
  }
};

export const getCreditCards = () => async (dispatch) => {
  try {
    const res = await api.get("/user/card");

    dispatch({ type: SET_CREDIT_CARDS, payload: res.data });
    return res.data;
  } catch (error) {
    console.error("kerid kartı hatası:", error);
  }
};

export const addNewCreditCards = (creditCards) => async (dispatch) => {
  try {
    const response = await api.post("/user/card", creditCards);
    const newCreditCardsFromServer = response.data[0] || response.data;
    dispatch({ type: ADD_CREDIT_CARD, payload: newCreditCardsFromServer });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateCreditCards = (creditCards) => async (dispatch) => {
  try {
    const res = await api.put("/user/card", creditCards);
    dispatch({ type: UPDATE_CREDIT_CARD, payload: creditCards });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteCreditCards = (creditCardsId) => async (dispatch) => {
  try {
    const response = await api.delete(`/user/card/${creditCardsId}`);
    dispatch({ type: DELETE_CREDIT_CARD, payload: creditCardsId });
    console.log(response);
  } catch (err) {
    console.error("Silme hatası:", err);
  }
};
