import React, { useEffect } from "react";
import { logout } from "../../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Logout = props => {

  const {onLogout} = props;
  
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Logout);
