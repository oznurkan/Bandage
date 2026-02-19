import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import authReducer from "./authReducer";
import { dataReducer } from "./dataReducer";
import orderReducer from "./orderReducer";

const reducers = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  auth: authReducer,
  appData: dataReducer,
  order: orderReducer
});

export default reducers;