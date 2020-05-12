import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={[classes.SideDrawer, props.open ? classes.Open:classes.Closed].join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}  />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
