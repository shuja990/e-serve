import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import axios from "axios";
const OffersRecieved = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [up, setUp] = useState(true);
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
        `http://localhost:5000/api/offers/rentedfrom/${userInfo._id}`,
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
  const createOrder = async (offer) => {
    try {
      // setLoading(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/rentcontract`,
        {
          offerId: offer._id,
          price: offer.price,
          title: offer.title,
          noOfMonths: offer.noOfMonths,
          rentedItem: offer.rentedItem,
          rentedBy: offer.rentedBy,
          rentedFrom: offer.rentedFrom,
        },
        config
      );
      if (data) {
        setLoading(false);
        history.push(`/rentcontract/${data._id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <h1>Offers Received</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rented By</th>
              <th>Rented From</th>
              <th>
                Price{" "}
                {up ? (
                  <i className="fas fa-arrow-up" onClick={() => setUp(!up)}></i>
                ) : (
                  <i
                    className="fas fa-arrow-down"
                    onClick={() => setUp(!up)}
                  ></i>
                )}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.sort((a,b)=>{
              if(!up){
                return a.price-b.price
              }
              else{
                return b.price-a.price
              }
            }).map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.rentedBy.name}</td>
                <td>{order.rentedFrom.name}</td>
                <td>${order.price}</td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => createOrder(order)}
                  >
                    Accept Offer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OffersRecieved;
