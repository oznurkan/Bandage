import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
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
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found in localStorage");
      return Promise.resolve(null);
    }
    api.defaults.headers.common["Authorization"] = token;

    return api
      .get("/verify")
      .then((response) => {
        const data = response.data;

        console.log("Token verified, user logged in:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          api.defaults.headers.common["Authorization"] = data.token;
        }
        dispatch(setUser(data));
        return data;
      })
      .catch((error) => {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        dispatch(setUser({}));

        return null;
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser({}));
  };
};