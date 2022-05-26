import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions/userActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const PaymentUpdate = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, paymentsEnabled: true }));
    }
  }, []);

  return (
    <Container>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <h1>Redirecting to home page</h1>
      )}
      {loading && <Loader />}
    </Container>
  );
};

export default PaymentUpdate;
