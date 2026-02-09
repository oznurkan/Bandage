import api from "../../api/api";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";
export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

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
  type: "ADD_TO_FAVORITES",
  payload: product
});

export const getProducts = (categoryId, filter, sort, limit = 25, offset = 0) => {
  return (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    const params = { limit, offset };
    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;

    return api
      .get("/products", { params }) 
      .then((response) => {
        dispatch(setProductList(response.data.products || []));
        dispatch(setTotal(response.data.total || 0));
        dispatch(setFetchState("FETCHED"));
      })
      .catch((error) => {
        dispatch(setFetchState("FAILED"));
        dispatch(setProductList([]));
        dispatch(setTotal(0));
        throw error;
      });
  };
};


export const getCategories = () => {
  return async (dispatch, getState) => {
    const { product } = getState();
    if (product.categories.length) return;

    const res = await api.get("/categories");

    const normalized = res.data.map(cat => ({
      ...cat,
      gender: cat.code.startsWith("k:") ? "k" : "e",
      slug: cat.code.split(":")[1],
    }));

    dispatch(setCategories(normalized));
  };
};


export const getProductDetail = (productId) => {
  return (dispatch) => {
    dispatch(setFetchState("FETCHING")); 
    
    return api
      .get(`/products/${productId}`)
      .then((res) => {
        dispatch(setSelectedProduct(res.data)); 
        dispatch(setFetchState("FETCHED"));
      })
      .catch((err) => {
        dispatch(setFetchState("FAILED"));
        console.error("Ürün çekme hatası:", err);
      });
  };
};