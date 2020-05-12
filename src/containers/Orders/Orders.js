import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {
const {onFetchOrders, token, userId} = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : (
        props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
