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
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getOrderDetails, payOrder } from "../../actions/rentContractActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import { createProductReview } from "../../actions/productActions";
import { createUserReview } from "../../actions/userActions";

const RentContractPage = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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
  const [complete, setComplete] = useState(false);
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

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
  }, [
    dispatch,
    orderId,
    successPay,
    complete,
    img,
    order,
    history,
    successDeliver,
    userInfo,
    successProductReview,
  ]);
  const deliverOrderr = async (a) => {
    let s = { img1: null, img2: null };
    s = {
      img1: a === "rentedBy" ? img : null,
      img2: a === "rentedFrom" ? img : null,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/rentcontract/contract/${order._id}`,
      s,
      config
    );
    setImg("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createUserReview(order.rentedFrom._id, {
        rating,
        comment,
      })
    );
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
  const markAsComplete = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/rentcontract/complete/${order._id}`,
        {},
        config
      );
      setComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = () => {
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
              {userInfo._id === order.rentedBy._id &&
              order.contractImgBuyer.length < 4 ? (
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
                    onClick={() => deliverOrderr("rentedBy")}
                  >
                    Upload Contract
                  </Button>
                </>
              ) : userInfo._id === order.rentedFrom._id &&
                order.contractImgSeller.length < 4 ? (
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
                    onClick={() => deliverOrderr("rentedFrom")}
                  >
                    Upload Contract
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
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {successProductReview && (
                <Message variant="success">
                  Review submitted successfully
                </Message>
              )}
              {loadingProductReview && <Loader />}
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {userInfo && order.contractStatus === "Complete" ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review{" "}
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Invoices</h2>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Price</th>
                    <th>Paid At</th>
                    <th>PAID</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {order.invoices.map((order, idx) => (
                    <tr key={idx + 1}>
                      <td>{idx + 1}</td>
                      <td>${order.amount / 100}</td>
                      <td>{order.paidAt}</td>
                      <td>
                        {order.isPaid ? (
                          "Paid"
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="light"
                          type="button"
                          onClick={() =>
                            window.open(order.url, "_blank").focus()
                          }
                          className="btn-sm"
                        >
                          View Invoice
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
              {!order.isPaid && order.rentedBy._id === userInfo._id && (
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
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={() => markAsComplete()}
                    >
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
