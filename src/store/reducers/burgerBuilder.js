import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngridient = (state, action) =>
  updateObject(state, {
    ingredients: updateObject(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });

const removeIngridient = (state, action) =>
  updateObject(state, {
    ingredients: updateObject(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }),
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  });

const setIngridients = (state, action) =>
  updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 0,
    error: false,
    building: false,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngridient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngridient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngridients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
