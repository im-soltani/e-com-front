import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
} from "./reducers/productReducers";
import {
  articleListReducer,
  articleSaveReducer,
  articleDeleteReducer,
} from "./reducers/articleReducers";
import {
  categoryListReducer,
  categorySaveReducer,
} from "./reducers/categoryReducer";
import { cartReducer } from "./reducers/cartReducers";
import { favorReducer } from "./reducers/favorReducers";

import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const favorItems = Cookie.getJSON("favorItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  favor: { favorItems },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  articleList: articleListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  favor: favorReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  articleSave: articleSaveReducer,
  productDelete: productDeleteReducer,
  articleDelete: articleDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  categoryList: categoryListReducer,
  categorySave: categorySaveReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
