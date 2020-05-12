import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger builder
    </NavigationItem>
    {props.isAuthenticated && (
      <NavigationItem link="/orders">Orders</NavigationItem>
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Auth</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
