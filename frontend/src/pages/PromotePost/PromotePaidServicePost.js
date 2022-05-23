import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
const PromotePaidSerivcePost = ({ match, history }) => {
  const [postType, setPostType] = useState("PS");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rentPost, setRentPost] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history]);
  console.log(match.params.id);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/promote`,
        {
          price: price,
          name: name,
          postType:postType,
          rentPost: rentPost,
          servicePost: match.params.id,
          promotedBy: userInfo._id,
        },
        config
      );
        window.open(data.url,"_blank").focus()
        setLoading(false);
    } catch (error) {
      setLoading(false)
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Promote Paid Service Post</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
   
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                required
                placeholder="Enter Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Promote
            </Button>
            <p>
              Note:This is a bidding process, if your bid is not in the top 3
              bids, your post will not be promoted
            </p>
          </Form>
        </FormContainer>
    </>
  );
};

export default PromotePaidSerivcePost;
