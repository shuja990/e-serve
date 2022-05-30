import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SendRentContractOffer from "./SendRentContractOffer";
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
import {
  listRentPostDetails,
  updateRentShares,
} from "../../actions/rentActions";
import PostShare from "../../components/PostShare/PostShare";
import Rating from "../../components/Rating";
const RentPostsPage = ({ match }) => {
  const dispatch = useDispatch();
  //   const match = useParams;
  const [offer, setOffer] = useState(false);
  const productDetails = useSelector((state) => state.rentPostDetail);
  const { loading, error, rentPost } = productDetails;
  console.log();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!rentPost._id || rentPost._id !== match.params.id) {
      dispatch(listRentPostDetails(match.params.id));
    }
  }, [dispatch, match]);

  //   const addToCartHandler = () => {
  //     history.push(`/cart/${match.params.id}?qty=${qty}`)
  //   }

  const handleShare = (socialType) => {
    dispatch(updateRentShares(rentPost, socialType));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/rentposts">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={rentPost.title} />
          <Row>
            <Col md={6}>
              <PostShare handleShare={handleShare} />
              <Image src={rentPost.thumbnailImage} alt={rentPost.title} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{rentPost.title}</h3>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Rating
                    value={rentPost.rating}
                    text={`${rentPost.numReviews} reviews`}
                  />
                </ListGroup.Item> */}
                {/* <ListGroup.Item>Price: ${rentPost.price}</ListGroup.Item> */}
                <ListGroup.Item>
                  Description: {rentPost.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created by: {rentPost?.createdBy?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created at: {rentPost?.createdAt?.substring(0, 10)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${rentPost.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {rentPost.isRented
                          ? "Item Not Available"
                          : "Item Available"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* {rentPost.isRented && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(rentPost.countInStock).keys()].map(
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
                    <Button
                      //   onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={rentPost.isRented || userInfo._id===rentPost?.createdBy?._id}

                    >
                     Contact User
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {offer ? (
                      <SendRentContractOffer product={rentPost} />
                    ) : (
                      <Button
                        onClick={() => setOffer(true)}
                        className="btn-block"
                        type="button"
                        disabled={rentPost?.isRented || userInfo?._id===rentPost?.createdBy?._id}
                      >
                        Send Offer
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {rentPost?.createdBy?.review.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {rentPost?.createdBy?.review?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    {/* <p>{review.createdAt.substring(0, 10)}</p> */}
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default RentPostsPage;
