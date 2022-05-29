import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import axios from "axios";
import QRCode from "react-qr-code";

const ProductsCollected = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState();
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);
  useEffect(() => {
    if (userInfo) {
      getOffers();
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  const getOffers = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/communityservice/collectedbyme/${userInfo._id}`,
        config
      );
      if (data) {
        setOrders(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Community Service Products Collected</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>

              <th>Collected From</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.title}</td>
                <td>{order.createdBy.name}</td>
                <td>
                  {value ? (
                    <QRCode
                      title={order._title}
                      value={value}
                      bgColor={back}
                      fgColor={fore}
                      size={size === "" ? 0 : size}
                    />
                  ) : (
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() =>
                        setValue(`
                    Collected By: ${order.collectedBy.name}
                    Item: ${order.title}
                    Location: ${order.location}
                    Coordinates: ${JSON.stringify(order.coordinates)}
                    `)
                      }
                    >
                      Generate QRCode
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsCollected;
