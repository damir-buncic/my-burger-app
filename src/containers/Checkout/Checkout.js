import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect, withRouter } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };


    return (
      <div>
        {props.purchased && <Redirect to="/" />}
        {!props.ingredients ? (
          <Redirect to="/" />
        ) : (
          <>
            <CheckoutSummary
              ingredients={props.ingredients}
              onCheckoutCancel={checkoutCancelledHandler}
              checkoutContinued={checkoutContinuedHandler}
            />

            <Route
              path={props.match.url + "/contact-data"}
              component={ContactData}
            />
          </>
        )}
      </div>
    );
  }


const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});


export default withRouter(connect(mapStateToProps)(Checkout));
