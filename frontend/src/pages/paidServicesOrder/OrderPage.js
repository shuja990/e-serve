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
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [img, setImg] = useState("");

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
  }, [dispatch, orderId, successPay, img, successDeliver]);

  const makePayment = () => {
    console.log(order);
    dispatch(
      payOrder(order._id, {
        price: order.orderItem.product.stripeProdId,
        account: order.seller.paymentDetails,
      })
    );
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  const deliverOrderr = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/orders/deliver/${order._id}`,
      { deliverables: img },
      config
    );
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
              <h2>Buyer</h2>
              <p>
                <strong>Name: </strong> {order.buyer.name}
              </p>
              <p>
                <strong>Order Status: </strong> {order.orderStatus}
              </p>
              {order.isDelivered ? (
                <>
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                  <Image src={order.deliverables} alt={order._id} fluid />
                </>
              ) : order.seller._id === userInfo._id ? (
                <>
                  <Message variant="danger">Not Delivered</Message>
                  <Form.Label>Upload Deliverable Image Only</Form.Label>
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
                    onClick={deliverOrderr}
                  >
                    Deliver Order
                  </Button>
                </>
              ) : null}
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
              {!order.orderItem ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Link
                          to={`/paidservice/${order.orderItem.product._id}`}
                        >
                          {order.orderItem.title}
                        </Link>
                      </Col>
                      <Col>
                        <Link to={`/paidservice/${order.orderItem.title}`}>
                          {order.orderItem.price}
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
                  <Col>Service</Col>
                  <Col>${order.orderItem.price}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={makePayment}
                    disabled={order.seller._id === userInfo._id}
                  >
                    Make Payment
                  </Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                // order.isPaid &&
                order.buyer._id === userInfo._id &&
                order.orderStatus === "InProgress" &&
                order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Complete
                    </Button>
                  </ListGroup.Item>
                )}
              {order.isPaid && (
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={()=>window.open(order.invoice,"_blank").focus()}
                >
                  View Invoice
                </Button>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
