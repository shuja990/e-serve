import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { addcommunityServicePost } from "../../actions/communityServiceActions";
import { COMMUNITY_SERVICE_CREATE_RESET } from "../../constants/communityServiceConstants";

const CreateCommunityServicePost = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isMovable, setMovable] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [locationError,setLocationError] = useState('')
  const dispatch = useDispatch();

  const communityServicePostCreate = useSelector(
    (state) => state.communityServiceCreate
  );
  const { loading, error, success } = communityServicePostCreate;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (success) { 
      history.push("/communityserviceposts");
      dispatch({
        type: COMMUNITY_SERVICE_CREATE_RESET
      })
    }

  }, [dispatch, history,success,userInfo]);

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
      addcommunityServicePost({
        title,
        coordinates,
        thumbnailImage,
        images: [],
        location,
        category,
        description,
      })
    );
  };
 const getLocation = () => {
    if (navigator.geolocation) {
      
      let location = navigator.geolocation.getCurrentPosition(showLocation,showError);
      console.log(location);
    } else { 
      setLocationError("Geolocation is not supported by this browser.");
    }
  }
  const showLocation = (loc) => {
    setCoordinates({lat:loc.coords.latitude.toString(),lon:loc.coords.longitude.toString()})
  }
  function showError(e) {
    switch(e.code) {
      case e.PERMISSION_DENIED:
        setLocationError("User denied the request for Geolocation.")
        break;
      case e.POSITION_UNAVAILABLE:
        setLocationError("Location information is unavailable.")
        break;
      case e.TIMEOUT:
        setLocationError("The request to get user location timed out.")
        break;
      case e.UNKNOWN_ERROR:
        setLocationError("An unknown error occurred.")
        break;
    }
  }
  return (
    <>
      <Link to="/communityserviceposts" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Community Service Post</h1>
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
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="coordinates">
              <Form.Label>Coordinates</Form.Label>
              <Form.Control
                type="text"
                placeholder="Latitude"
                value={coordinates.lat}
                onChange={(e) =>
                  setCoordinates({ ...coordinates, lat: e.target.value })
                }
              ></Form.Control>
              <Form.Control
                type="text"
                placeholder="Longitude"
                value={coordinates.lon}
                onChange={(e) =>
                  setCoordinates({ ...coordinates, lon: e.target.value })
                }
              ></Form.Control>
              <Button type="button" className="mb-2 mt-2" variant="primary" onClick={getLocation}>
                Get Location
              </Button>
              {
                locationError && <Message variant="danger" >{locationError}</Message>
              }
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type="text"
                required
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
                required
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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

export default CreateCommunityServicePost;
