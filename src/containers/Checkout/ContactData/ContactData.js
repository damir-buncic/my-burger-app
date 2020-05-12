import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions";
import { checkValidity } from "../../../shared/utility";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "Damir",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street"
      },
      value: "Street",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Zip"
      },
      value: "12345",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country"
      },
      value: "Croatia",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email"
      },
      value: "test@test.com",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "fastest",
      validation: {},
      valid: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = e => {
    e.preventDefault();
    const formData = {};
    Object.keys(orderForm).forEach(
      key => (formData[key] = orderForm[key].value)
    );
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChanged = (event, id) => {
    const value = event.target.value;
    const of = {
      ...orderForm,
      [id]: {
        ...orderForm[id],
        value,
        valid: checkValidity(value, orderForm[id].validation),
        touched: true
      }
    };

    const valid = Object.keys(of).every(key => of[key].valid);
    setOrderForm(of)
    setFormIsValid(valid);
  };

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact data</h4>
      {props.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={orderHandler}>
          {Object.keys(orderForm).map(key => (
            <Input
              key={key}
              elementType={orderForm[key].elementType}
              elementConfig={orderForm[key].elementConfig}
              value={orderForm[key].value}
              changed={e => inputChanged(e, key)}
              invalid={!orderForm[key].valid}
              shouldValidate={!!orderForm[key].validation}
              touched={orderForm[key].touched}
            />
          ))}

          <Button disabled={!formIsValid} btnType="Success">
            ORDER
          </Button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (order, token) => dispatch(purchaseBurger(order, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
