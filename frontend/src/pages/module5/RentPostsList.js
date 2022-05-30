import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import RentProduct from "../../components/rentProduct";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { rentPostsList } from "../../actions/rentActions";
import SearchBox from "../../components/SearchBox";

const RentPosts = ({ match }) => {
  const dispatch = useDispatch();

  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading, error, rentPosts } = rentPostList;
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(rentPostsList());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Rent Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form className="d-flex">
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Products..."
              className="mr-sm-1 ml-sm-5"
            ></Form.Control>
          </Form>{" "}
          <Row>
            {rentPosts.filter(e=>e.title.toLowerCase().includes(keyword.toLowerCase())).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <RentProduct product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default RentPosts;
