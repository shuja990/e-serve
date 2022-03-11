import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { addRentPost } from "../../actions/rentActions";

const CreateRentPost = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isMovable, setMovable] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const rentPostCreate = useSelector((state) => state.rentCreate);
  const { loading, error, success } = rentPostCreate;

  useEffect(() => {
    if (success) {
      history.push("/rentposts");
    }
  }, [dispatch, history, success]);

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

      const { data } = await axios.post("/api/upload", formData, config);

      setThumbnailImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addRentPost({
        title,
        price,
        thumbnailImage,
        images:[],
        location,
        category,
        description,
        isMovable,
      })
    );
  };

  return (
    <>
      <Link to="/rentposts" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Rent Post</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={thumbnailImage}
                onChange={(e) => setThumbnailImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                id="image-file"
                label="Choose File"
                custom
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>
              
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isMovable" className="mt-3 mb-3">
              {/* <Form.Label></Form.Label> */}
              <Form.Check
                // type="text"
                // placeholder="Enter is"
                label="is Movable?"
                checked={isMovable}
                value={isMovable}
                onChange={(e) => setMovable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CreateRentPost;
