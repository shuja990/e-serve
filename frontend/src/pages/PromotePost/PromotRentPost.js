import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
const PromoteRentPost = ({ match, history }) => {
  const [postType, setPostType] = useState("R");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [servicePost, setPaidServicePost] = useState(null);

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
          rentPost: match.params.id,
          servicePost: servicePost,
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
      <h1>Promote Service Post</h1>
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

          </Form>
        </FormContainer>
    </>
  );
};

export default PromoteRentPost;
