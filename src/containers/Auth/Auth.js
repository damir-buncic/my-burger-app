import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { auth, setAuthRedirectPath } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/utility";

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail address"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  });

  const [signup, setSignup] = useState(true);
  const { building, authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    if (!building && authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath]);

  const inputChanged = (event, id) => {
    const value = event.target.value;
    setControls({
      ...controls,
      [id]: {
        ...controls[id],
        value,
        valid: checkValidity(value, controls[id].validation),
        touched: true
      }
    });
  };

  const authHandler = e => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, signup);
  };

  const switchAuthModeHandler = () => {
    setSignup(!signup);
  };

  return (
    <div className={classes.Auth}>
      {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
      <form onSubmit={authHandler}>
        {props.loading ? (
          <Spinner />
        ) : (
          Object.keys(controls).map(key => (
            <Input
              key={key}
              elementType={controls[key].elementType}
              elementConfig={controls[key].elementConfig}
              value={controls[key].value}
              changed={e => inputChanged(e, key)}
              invalid={!controls[key].valid}
              shouldValidate={!!controls[key].validation}
              touched={controls[key].touched}
            />
          ))
        )}
        <Button btnType="Success">Submit</Button>
        {props.error && <p>{props.error}</p>}
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Switch to {signup ? "signing" : "signup"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  building: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(auth(email, password, isSignup)),
  onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
