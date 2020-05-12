import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addIngridient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngridient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const initIngridients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(r => dispatch(setIngridients(r.data)))
      .catch(error => dispatch(fetchIngridientsFailed()));
  };
};

export const setIngridients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngridientsFailed = () => ({ type: actionTypes.FETCH_INGREDIENTS_FAILED });