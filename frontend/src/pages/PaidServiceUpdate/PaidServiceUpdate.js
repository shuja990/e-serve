import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  listPaidServiceDetails,
  updatePaidService,
} from "../../actions/paidServiceActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

const PaidServiceUpdate = ({ match, history }) => {
  const productId = match.params.id;

  const [title, setTitle] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const paidServiceDetails = useSelector((state) => state.paidServiceDetails);
  const { loading, error, paidService } = paidServiceDetails;

  const paidServiceUpdate = useSelector((state) => state.paidServiceUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = paidServiceUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      //   history.push('/admin/productlist')
      history.push("/paidservices");
    } else {
      if (!paidService.title || paidService._id !== productId) {
        dispatch(listPaidServiceDetails(productId));
      } else { 
        setTitle(paidService.title);
        setThumbnailImage(paidService.thumbnailImage);
        setDescription(paidService.description);
      }
    }
  }, [dispatch, history, productId, paidService, successUpdate]);

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

      const { data } = await axios.post("http://localhost:5000/api/upload", formData, config);

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
      updatePaidService({
        _id: productId,
        title,
        thumbnailImage,
        description,
        location: paidService.location,
        category: paidService.category,
        price: paidService.price,
        noOfUpdates: paidService.noOfUpdates+1
      })
    );
  };

  return (
    <>
      <Link to="/paidservices" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Paid Service</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                required
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter image url"
                value={thumbnailImage}
                onChange={(e) => setThumbnailImage(e.target.value)}
              ></Form.Control>
              {/* <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File> */}
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PaidServiceUpdate;
