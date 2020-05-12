import React from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = props => (
  <>
    <h3>Your order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      {Object.keys(props.ingredients).map(igKey => (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {props.ingredients[igKey]}
        </li>
      ))}
    </ul>
    <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
    <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
  </>
);

export default OrderSummary;
