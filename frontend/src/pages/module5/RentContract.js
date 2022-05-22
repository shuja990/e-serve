import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getOrderDetails, payOrder } from "../../actions/rentContractActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";

const RentContractPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [img, setImg] = useState("");
  const [da, setDa] = useState("");
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
    let s = new Date(order?.createdAt);
    s.setMonth(s.getMonth() + parseInt(order?.noOfMonths));
    setDa(s.toDateString());
  }, [dispatch, orderId, successPay, img]);

  const deliverOrderr = async (a) => {
    let s={img1:null,img2:null}
    s={img1:a==="rentedBy"?img:null,img2:a==="rentedFrom"?img:null}
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(a);

    console.log(s);
    console.log(img);

    const { data } = await axios.post(
      `http://localhost:5000/api/rentcontract/contract/${order._id}`,
      s,
      config
    );
    console.log(data);
    setImg("");
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        config
      );

      setImg(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const makePayment = () => {
    console.log(order);
    var d = new Date();
    d.setMonth(d.getMonth() + parseInt(order.noOfMonths));
    let seconds = Math.trunc(d.getTime() / 1000);
    dispatch(
      payOrder(order._id, {
        email: userInfo.email,
        payfrom: userInfo.paymentDetails,
        price: order.priceId,
        date: seconds,
        payto: order.rentedFrom.paymentDetails,
      })
    );
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Rented By</h2>
              <p>
                <strong>Name: </strong> {order.rentedBy.name}
              </p>
              <h2>Rented From</h2>
              <p>
                <strong>Name: </strong> {order.rentedFrom.name}
              </p>
              <p>
                <strong>Order Status: </strong> {order.contractStatus}
              </p>
              <p>
                <strong>Subscription End Date: </strong> {da}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {
                userInfo._id === order.rentedBy && order.contractImgBuyer.length<4 ?
                <>
                <Form.Label>Upload Rent Contract</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter image url"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                ></Form.Control>
                <Form.Control
                  id="image-file"
                  label="Choose File"
                  custom
                  required
                  type="file"
                  onChange={uploadFileHandler}
                ></Form.Control>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={()=>deliverOrderr('rentedBy')}
                >
                  Upload Contract
                </Button>
                </>
                : userInfo._id === order.rentedFrom && order.contractImgSeller.length<4 ?
                <>
                <Form.Label>Upload Rent Contract</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter image url"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                ></Form.Control>
                <Form.Control
                  id="image-file"
                  label="Choose File"
                  custom
                  required
                  type="file"
                  onChange={uploadFileHandler}
                ></Form.Control>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={()=>deliverOrderr("rentedFrom")}
                >
                  Upload Contract
                </Button>
                </>
                :null
              }

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>

              {order.isPaid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {!order.rentedItem ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Link to={`/rent/${order.rentedItem._id}`}>
                          {order.rentedItem.title}
                        </Link>
                      </Col>
                      <Col>
                        <Link to={`/rent/${order.rentedItem.title}`}>
                          {order.price}
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Rent Contract</Col>
                  <Col>${order.price}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.rentedBy === userInfo._id && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={makePayment}
                  >
                    Make Payment
                  </Button>
                </ListGroup.Item>
              )}
              {userInfo &&
                order.contractStatus === "Started" &&
                userInfo.isAdmin === true && (
                  <ListGroup.Item>
                    <Button type="button" className="btn btn-block">
                      Mark As Complete
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RentContractPage;
