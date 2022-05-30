import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import axios from "axios";
import {
  disputeOrder,
  getDispute,
  ifInDIsputes,
  isUserService,
  resolveDispute,
  updateDispute,
} from "../../actions/disputeActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails
 
} from "../../actions/rentContractActions";



function ConflictRentScreen({ match }) {
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disputeType, setDisputeType] = useState("rental");
  const [serviceType, setServiceType] = useState("");
  const [disputeCreatedBy, setDisputeCreatedBy] = useState("");
  const [sellerEvidence, setSellerEvidence] = useState("");
  const [buyerEvidence, setBuyerEvidence] = useState("");
  const [uploading, setUploading] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");

  const isSellerServiceBool = useSelector(
    (state) => state.isSellerServiceStore.isSellerService
  );
  const isSellerServiceLoading = useSelector(
    (state) => state.isSellerServiceStore.loading
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector((state) => state.orderDetails);

  const myDisputesStoreList = useSelector(
    (state) => state.getMyDisputesReducerStore
  );
  const disputeStore = useSelector((state) => state.disputeStore);
  const dispute = disputeStore?.dispute;

  const {
    loading: disputesLoading,
    error: disputesError,
    myDisputes,
  } = myDisputesStoreList;

  const dispatch = useDispatch();

  useEffect(() => {
    // find the dispute in your disputes
    // const isDisputeAvailable= myDisputes.service.find(dispute => dispute.disputeService === match.params.id ||  dispute.disputeRent === match.params.id)
    dispatch(getDispute(match.params.id));

    // dispatch(getOrderDetails(dispute?.disputeService==null? dispute?.disputeRent :dispute?.disputeRent==null?dispute?.disputeService:null ))

    // conflict page
    // dispatch(getOrderDetails(dispute?.disputeOrderId))
    // order page
    // dispatch(getOrderDetails(match.params.id))
    dispatch(isUserService(match.params.id));
    // dispatch(listMyOrdersAsBuyer(userInfo._id))
    dispatch(ifInDIsputes(match.params.id));
    // conflict page
    // dispatch(getOrderDetails(`${dispute?.disputeOrderId}`))
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getOrderDetails(
        `${dispute?.disputeOrderId ? dispute?.disputeOrderId : match.params.id}`
      )
    );
  }, [dispatch, dispute]);

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

  const handleDisputeReply = () => {
    dispatch(
      updateDispute(
        {
          title,
          disputeType,
          buyerEvidence:
            dispute?.buyerEvidence == null &&
            orderDetails?.order.rentedBy._id.toString() === userInfo._id.toString()
              ? thumbnailImage
              : dispute?.buyerEvidence,
          sellerEvidence:
            dispute?.sellerEvidence == null &&
            orderDetails?.order.rentedFrom._id.toString() ===
              userInfo._id.toString()
              ? thumbnailImage
              : dispute?.sellerEvidence,

          // buyerEvidence: orderDetails.order.buyer._id.toString() === userInfo._id.toString()?thumbnailImage:dispute?.buyerEvidence,
          // sellerEvidence:orderDetails.order.seller._id.toString()=== userInfo._id.toString()?thumbnailImage:dispute?.sellerEvidence ,

          // message: description,
          // serviceType,
          // disputeCreatedBy: userInfo._id,
          // disputeCreatedAgainst: orderDetails?.order.buyer._id===userInfo._id?orderDetails?.order.seller._id: orderDetails?.order.buyer._id
        },
        match.params.id
      )
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      disputeOrder(
        {
          title,
          disputeType,
          buyerEvidence: isSellerServiceBool ? null : thumbnailImage,
          sellerEvidence: isSellerServiceBool ? thumbnailImage : null,
          message: description,
          serviceType,
          disputeCreatedBy: userInfo._id,
          disputeCreatedAgainst:
            orderDetails.order.buyer._id === userInfo._id
              ? orderDetails.order.seller._id
              : orderDetails.order.buyer._id,
        },
        match.params.id
      )
    );

    // history.push('/paidservices')
  };

  const handleAdminResponse = (e) => {
    e.preventDefault();

    dispatch(
      resolveDispute(
        {
          adminResponse,
        },
        match.params.id
      )
    );
  };

  return (
    <div>
      <h1 className="text-center mb-5">Conflict Resolution Desk</h1>
      {dispute?.isOpened ? (
        <div className="md:d-flex  md:justify-content-between ">
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

              <Form.Group className="mb-3 mt-4">
                <Form.Label htmlFor="">Dispute Type</Form.Label>
                <Form.Select
                  id=""
                  onChange={(e) => setDisputeType(e.target.value)}
                >
                  <option value="rental">Rental</option>
                  <option value="paid service">Paid Service</option>
                </Form.Select>
              </Form.Group>

              {dispute?.isOpened ? (
                <Button
                  name="reply"
                  onClick={handleDisputeReply}
                  className="mt-5"
                  variant="primary"
                >
                  Reply to Dispute
                </Button>
              ) : (
                <Button
                  name="open"
                  className="mt-5"
                  type="submit"
                  variant="primary"
                >
                  Open Dispute
                </Button>
              )}
            </Form>

            <h1 className="text-center">Evaluation</h1>
            <h1>Seller Evidence</h1>
            {dispute ? <img src={dispute?.sellerEvidence} alt="" /> : ""}

            <h1>Buyer Evidence</h1>
            {dispute ? (
              <img
                style={{ maxWidth: "100%", objectFit: "contain" }}
                src={dispute?.buyerEvidence}
                alt=""
              />
            ) : (
              ""
            )}
          </div>

          {/* admin funct */}
          {
               userInfo.isAdmin === true?
               <div className="resolve-dispute d-flex flex-column mt-5   ">
            <h1 className="font-bold">Resolve Dispute</h1>

            <form onSubmit={handleAdminResponse}>
              <Form.Group controlId="name">
                <Form.Label>Admin Response</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Dsipute Response"
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                className="align-self-center mt-5"
                variant="success"
              >
                Resolve Dispute
              </Button>
              <Button className="align-self-center mt-5 ml-5" variant="danger">
                Refund Buyer
              </Button>

              <Button className="align-self-center mt-5 ml-5" variant="danger">
                Cancel Subscription
              </Button>
            </form>
          </div>
               :''
            }
          
        </div>
      ) : (
        <div>
          <h1>Resolved</h1>
          <h1 style={{ color: "green", textAlign: "center" }}>
            Admin Response
          </h1>
          <p className="text-center">{dispute?.adminResponse}</p>
          <div className="d-flex justify-content-center">
            <img src={`https://i.gifer.com/7efs.gif`} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConflictRentScreen;
