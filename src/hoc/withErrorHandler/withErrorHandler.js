import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/httpErrorHandler";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

    const [error, confirmedErrorHandler] = useHttpErrorHandler(axios)

    return (
      <>
        <Modal show={error} modalClosed={confirmedErrorHandler}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
