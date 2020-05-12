import React, { useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = props => {
  
  const [showSideDrawer, setShowSideDrawer] = useState(false);


  const sideDrawerClosedHandler = () => setShowSideDrawer(false);
  
  const sideDrawerOpenHandler = () => setShowSideDrawer(true);

    return (
      <>
        <Toolbar openSideDrawer={sideDrawerOpenHandler} isAuthenticated={props.isAuthenticated}  />
        <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} isAuthenticated={props.isAuthenticated}  />
        <main className={classes.Content}>{props.children}</main>
      </>
    );
  }



const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Layout);
