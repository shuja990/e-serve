import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import axios from "axios";
import Loader from "../../components/Loader";

const PaymentSuccessPage = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      updateOrder();
    }
  }, []);

  const updateOrder = async () => {
    setLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/orders/markpaid/${match.params.id}`,
      {},
      config
    );
      setLoading(false)
      history.push(`/order/${data._id}`)
  };

  return (
    <Container>
      <h1>Redirecting to order page</h1>
      <Loader/>
    </Container>
  );
};

export default PaymentSuccessPage;
