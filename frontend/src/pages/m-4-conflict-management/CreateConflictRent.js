import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import axios from "axios";
import {
  disputeOrder,
  getDispute,
  ifInDIsputes,
  isUserService,
  updateDispute,
} from "../../actions/disputeActions";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../actions/rentContractActions";
import { Link } from "react-router-dom";

function CreateConflictRent({ match }) {
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disputeType, setDisputeType] = useState("rental");
  const [serviceType, setServiceType] = useState("");
  const [disputeCreatedBy, setDisputeCreatedBy] = useState("");
  const [sellerEvidence, setSellerEvidence] = useState("");
  const [buyerEvidence, setBuyerEvidence] = useState("");
  const [uploading, setUploading] = useState(false);

  const isSellerServiceBool = useSelector(
    (state) => state.isSellerServiceStore.isSellerService
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector((state) => state.orderDetails);

  const myDisputesStoreList = useSelector(
    (state) => state.getMyDisputesReducerStore
  );
  const disputeStore = useSelector((state) => state.disputeStore);
  const dispute = disputeStore?.dispute;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDispute(match.params.id));

    dispatch(isUserService(match.params.id));

    dispatch(ifInDIsputes(match.params.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderDetails(`${match.params.id}`));
  }, [dispatch, dispute]);

  console.log(orderDetails);
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

      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        config
      );

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
      disputeOrder(
        {
          title,
          disputeType,
          buyerEvidence:
            orderDetails.order.rentedBy._id === userInfo._id
              ? thumbnailImage
              : null,
          sellerEvidence:
            orderDetails.order.rentedFrom._id === userInfo._id
              ? thumbnailImage
              : null,
          message: description,
          serviceType,
          disputeCreatedBy: userInfo._id,
          disputeCreatedAgainst:
            orderDetails.order.rentedBy._id === userInfo._id
              ? orderDetails.order.rentedFrom._id
              : orderDetails.order.rentedBy._id,
        },
        match.params.id
      )
    );

    setTitle("");
    setDescription("");
    setThumbnailImage("");
    setDisputeType("rental");

    // history.push('/paidservices')
  };

  return (
    <div>
      <h1 className="text-center mb-5">Open Dispute on this Service</h1>
      <div className="d-flex  justify-content-center">
        <div className="upload-evidence">
          <h2>Upload evidence and open dispute</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Evidence</Form.Label>

              <Form.Control
                id="image-file"
                type="file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Button
              name="open"
              className="mt-5"
              type="submit"
              variant="primary"
            >
              Open Dispute
            </Button>

            <Link to={`/myconflicts/${userInfo._id}`}>
              <Button name="open" className="mt-5 ml-5  " variant="success">
                Go To My Disputes
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateConflictRent;
