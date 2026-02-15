import api from "../../api/api";
import { toast } from "react-toastify";

import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_SELECTED_PRODUCT,
  ADD_TO_FAVORITES,
} from "../actions/actionTypes";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});

export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITES,
  payload: product,
});

export const getProducts = (
  categoryId,
  filter,
  sort,
  limit = 25,
  offset = 0,
) => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    const params = { limit, offset };
    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;

    try {
      const response = await api.get("/products", { params });

      dispatch(setProductList(response.data.products || []));
      dispatch(setTotal(response.data.total || 0));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      dispatch(setProductList([]));
      dispatch(setTotal(0));

      console.error("GetProducts Error:", error);
      toast.error("Ürünler yüklenirken bir sorun oluştu.");
    }
  };
};

export const getCategories = () => {
  return async (dispatch, getState) => {
    const { product } = getState();
    if (product.categories.length > 0) return;

    try {
      const res = await api.get("/categories");

      const normalized = res.data.map((cat) => ({
        ...cat,
        gender: cat.code.startsWith("k:") ? "k" : "e",
        slug: cat.code.split(":")[1],
      }));

      dispatch(setCategories(normalized));
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      console.error("Kategori çekme hatası:", error);
      toast.error(
        "Kategoriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.",
      );
    }
  };
};

export const getProductDetail = (productId) => {
  return async (dispatch) => {
    dispatch(setFetchState("FETCHING"));

    try {
      const res = await api.get(`/products/${productId}`);

      dispatch(setSelectedProduct(res.data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      dispatch(setFetchState("FAILED"));
      console.error("Kategori detay sayfası çekme hatası:", error);
      toast.error(
        "Kategori detay sayfası yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.",
      );
    }
  };
};
