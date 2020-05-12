import React, { useState, useEffect, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  removeIngridient,
  addIngridient,
  initIngridients,
  purchaseInit,
  setAuthRedirectPath
} from "../../store/actions";

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

const dispatch = useDispatch();

const onIngredientAdded = ingredientName => dispatch(addIngridient(ingredientName));
const onIngredientRemoved = ingredientName => dispatch(removeIngridient(ingredientName));
const initializeIngridients = useCallback(() => dispatch(initIngridients()), [dispatch]);
const onInitPurchase = () => dispatch(purchaseInit());
const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path));

const ingredients = useSelector(state => state.burgerBuilder.ingredients);
const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
const error = useSelector(state => state.burgerBuilder.error);
const isAuthenticated = useSelector(state => !!state.auth.token);


 
  useEffect(() => {
    initializeIngridients();
  }, [initializeIngridients]);

  const updatePurchaseState = () =>
    Object.keys(ingredients).some(igKey => ingredients[igKey] > 0);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => setPurchasing(false);

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = { ...ingredients };

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] === 0;
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {!ingredients ? (
          <Spinner />
        ) : (
          <OrderSummary
            ingredients={ingredients}
            cancel={purchaseCancelHandler}
            continue={purchaseContinueHandler}
            price={totalPrice}
          />
        )}
      </Modal>
      {ingredients ? (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disable={disableInfo}
            price={totalPrice}
            purchaseable={updatePurchaseState()}
            ordered={purchaseHandler}
            isAuthenticated={isAuthenticated}
          />
        </>
      ) : error ? (
        <p>Ingredients could not be loaded</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
