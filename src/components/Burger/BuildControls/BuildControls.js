import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(c => (
      <BuildControl
        added={() => props.ingredientAdded(c.type)}
        removed={() => props.ingredientRemoved(c.type)}
        key={c.label}
        label={c.label}
        disable={props.disable[c.type]}
      />
    ))}
    <button
      disabled={!props.purchaseable}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      {props.isAuthenticated ? "Order NOW": "Signup to order"}
    </button>
  </div>
);

export default BuildControls;
