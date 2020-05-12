import React, { Suspense, useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";

import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions";
import Spinner from "./components/UI/Spinner/Spinner";

const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const App = props => {
  const { onTryAutosignup } = props;

  useEffect(() => {
    onTryAutosignup();
  }, [onTryAutosignup]);

  return (
    <div>
      <Layout>
        <Switch>
          <Route
            path="/auth"
            render={props => (
              <Suspense fallback={<Spinner />}>
                <Auth {...props} />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route
            path="/checkout"
            render={props => (
              <Suspense fallback={<Spinner />}>
                <Checkout {...props} />
              </Suspense>
            )}
          />
          {props.isAuthenticated && (
            <Route
              path="/orders"
              render={props => (
                <Suspense fallback={<Spinner />}>
                  <Orders {...props} />
                </Suspense>
              )}
            />
          )}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onTryAutosignup: () => dispatch(authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
