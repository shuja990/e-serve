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
// import Rating from "../components/Rating";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import { listcommunityServicePostDetails } from "../../actions/communityServiceActions";
import PostShare from "../../components/PostShare/PostShare";
import axios from "axios";
const CommunityServicePage = ({ match }) => {
  const dispatch = useDispatch();
  //   const match = useParams;
  const productDetails = useSelector(
    (state) => state.communityServicePostDetail
  );
  const { loading, error, communityServicePost } = productDetails;
  const [e, setE] = useState("");
  const [l, setL] = useState(false);
  const [s, setS] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (
      !communityServicePost._id ||
      communityServicePost._id !== match.params.id
    ) {
      dispatch(listcommunityServicePostDetails(match.params.id));
    }
  }, [dispatch, match]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setL(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/communityservice/offers`,
        {
          title: communityServicePost.title,
          item: communityServicePost._id,
          collectedBy: userInfo._id,
          collectedFrom: communityServicePost.createdBy._id,
        },
        config
      );
      setL(false);
      setS(true);
    } catch (error) {
      setE(error.message);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/communityserviceposts">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : s ? (
        <Message variant="success">
          Offer to collect product Sent successfully
        </Message>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : e ? (
        <Message variant="danger">{e}</Message>
      ) : (
        <>
        {
          l && <Loader/>
        }
          <Meta title={communityServicePost.title} />
          <Row>
            <Col md={6}>
              <PostShare />
              <Image
                src={communityServicePost.thumbnailImage}
                alt={communityServicePost.title}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{communityServicePost.title}</h3>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Rating
                    value={communityServicePost.rating}
                    text={`${communityServicePost.numReviews} reviews`}
                  />
                </ListGroup.Item> */}
                {/* <ListGroup.Item>Price: ${communityServicePost.price}</ListGroup.Item> */}
                <ListGroup.Item>
                  Description: {communityServicePost.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created by: {communityServicePost.createdBy?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created at: {communityServicePost.createdAt?.substring(0, 10)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {communityServicePost.available
                          ? "Item Available"
                          : "Item Not Available"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      //   onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={
                        !communityServicePost.available ||
                        userInfo._id === communityServicePost?.createdBy._id
                      }
                    >
                      Contact User
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={
                        !communityServicePost?.available ||
                        userInfo?._id === communityServicePost?.createdBy._id
                      }
                      onClick={submitHandler}
                    >
                      Send Offer
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {communityServicePost.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {communityServicePost.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
};

export default CommunityServicePage;
