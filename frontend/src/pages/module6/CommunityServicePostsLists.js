import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { communityServicePostsList } from "../../actions/communityServiceActions";
import CSProduct from "../../components/communityServiceProduct";

const CommunityServicePostsLists = ({ match }) => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const cspostslist = useSelector((state) => state.communityServicePosts);
  const { loading, error, communityServicePosts } = cspostslist;
  useEffect(() => {
    dispatch(communityServicePostsList());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Community Service Posts</h1>
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
            {communityServicePosts
              .filter((e) =>
                e.title.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <CSProduct product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default CommunityServicePostsLists;
