import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../../components/Rating";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import {
  listPaidServiceDetails,
  updatePSShares,
} from "../../actions/paidServiceActions";
import PostShare from "../../components/PostShare/PostShare";
import {createOrder} from '../../actions/orderActions'
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
const PaidServiceDetails = ({ history, match }) => {
  const [duration, setDuration] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const paidServiceDetails = useSelector((state) => state.paidServiceDetails);
  const { loading, error, paidService } = paidServiceDetails;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading: l, error: e, success, order } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const productReviewCreate = useSelector((state) => state.productReviewCreate)
  //   const {
  //     success: successProductReview,
  //     loading: loadingProductReview,
  //     error: errorProductReview,
  //   } = productReviewCreate

  useEffect(() => {
    // if (successProductReview) {
    //   setRating(0)
    //   setComment('')
    // }
    if(success){
      dispatch({type: ORDER_CREATE_RESET })

      history.push(`/order/${order._id}`)

    }
    if (!paidService._id || paidService._id !== match.params.id) {
      dispatch(listPaidServiceDetails(match.params.id));
      //   dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    console.log(order);
  }, [
    dispatch,
    match,
    success
    //  successProductReview
  ]);

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        buyer:userInfo._id,
        seller:paidService.createdBy,
        duration:duration,
        orderItem:{
          title:paidService.title,
          price:paidService.price,
          product:paidService._id
        }
      },history)
    )
  };

  const handleShare = (socialType) => {
    dispatch(updatePSShares(paidService, socialType));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/paidservices">
        Go Back
      </Link>
      {loading || l ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {e && <Message variant="danger">{e}</Message>}
          <Meta title={paidService.title} />
          <Row>
            <Col md={6}>
              <PostShare handleShare={handleShare} />
              <Image
                src={paidService.thumbnailImage}
                alt={paidService.title}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{paidService.title}</h3>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Rating
                    value={paidService.rating}
                    text={`${paidService.numReviews} reviews`}
                  />
                </ListGroup.Item> */}
                <ListGroup.Item>Price: ${paidService.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {paidService.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Provider:</Col>
                      <Col>
                        <strong>{`${paidService?.createdBy?.name}`}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${paidService.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {paidService.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item> */}

                  {/* {paidService.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(paidService.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )} */}

                  <ListGroup.Item>
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="duration">
                        <Form.Label>Enter duration for the order in hours</Form.Label>
                        <Form.Control
                          type="number"
                          max={15}
                          placeholder="Enter Duration for the order"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        className="btn-block"
                        type="submit"
                        disabled={userInfo === null || userInfo._id===paidService?.createdBy?._id}
                      >
                        Buy Service
                      </Button>

                      <Link to='/chat' >
                      <Button
                        className="btn-block mt-3"
                        disabled={userInfo === null || userInfo._id===paidService?.createdBy?._id}
                      >
                        Contact
                      </Button>
                      </Link>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* review section */}

          {/* <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {paidService?.createdBy?.review.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {paidService?.createdBy?.review.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
};

export default PaidServiceDetails;
