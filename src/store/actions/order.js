import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const purchaseBurgerSuccess = (id, order) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  id,
  order
});

export const purchaseBurgerFailed = error => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (order, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then(response =>
        dispatch(purchaseBurgerSuccess(response.data.name, order))
      )
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFailed = error => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get("orders.json?auth=" + token + "&orderBy=\"userId\"&equalTo=\"" + userId + "\"")
    .then(response => {
      dispatch(fetchOrdersSuccess(
        Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key]
        }))
      ));
    })
    .catch(error => dispatch(fetchOrdersFailed(error)));
  };
};
