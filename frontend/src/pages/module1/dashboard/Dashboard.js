import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import { Button, Table } from "react-bootstrap";
import Loader from "../../../components/Loader";
import {
  deleteRentPost,
  rentPostsListAnalytics,
} from "../../../actions/rentActions";
import {
  deletePaidService,
  paidServicesListAnalytics,
} from "../../../actions/paidServiceActions";
import {
  deletecommunityServicePost,
  myCommunityServicePosts,
} from "../../../actions/communityServiceActions";
import { RENT_DELETE_RESET } from "../../../constants/rentConstants";
import { COMMUNITY_SERVICE_DELETE_RESET } from "../../../constants/communityServiceConstants";
import { PAID_SERVICES_DELETE_RESET } from "../../../constants/paidServiceConstants";
const Dashboard = ({ history }) => {
  const dispatch = useDispatch();
  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading: rentLoading, error: rentError, rentPosts } = rentPostList;
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const {
    loading: paidLoading,
    error: paidError,
    paidServices,
  } = paidServicesStoreList;

  const communitySList = useSelector((state) => state.communityServicePosts);
  const { loading, error, communityServicePosts } = communitySList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const rentDelete = useSelector((state) => state.rentPostDelete);
  const { loading: rdloading, error: rdError, success: rdSuccess } = rentDelete;
  const csDelete = useSelector((state) => state.communityServicePostDelete);
  const { loading: csloading, error: csError, success: csSuccess } = csDelete;
  const paidDelete = useSelector((state) => state.paidServiceDelete);
  const { loading: psloading, error: psError, success: psSuccess } = paidDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(rentPostsListAnalytics(userInfo._id));
      dispatch(paidServicesListAnalytics(userInfo._id));
      dispatch(myCommunityServicePosts(userInfo._id));
    } else {
      history.push("/login");
    }
    return () => {
      dispatch({ type: RENT_DELETE_RESET });
      dispatch({ type: COMMUNITY_SERVICE_DELETE_RESET });
      dispatch({ type: PAID_SERVICES_DELETE_RESET });
    };
  }, [
    dispatch,
    userInfo._id,
    userInfo,
    history,
    psSuccess,
    csSuccess,
    rdSuccess,
  ]);
  const deleteRentPostt = (id) => {
    dispatch(deleteRentPost(id));
  };
  const deleteCSPost = (id) => {
    dispatch(deletecommunityServicePost(id));
  };
  const deletePSPost = (id) => {
    dispatch(deletePaidService(id));
  };
  return (
    <>
      {rentLoading || paidLoading || loading ? (
        <Loader />
      ) : rentError ? (
        <Message variant="danger">{rentError}</Message>
      ) : paidError ? (
        <Message variant="danger">{paidError}</Message>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {rdError ? (
            <Message variant="danger">{rdError}</Message>
          ) : csError ? (
            <Message variant="danger">{csError}</Message>
          ) : psError ? (
            <Message variant="danger">{psError}</Message>
          ) : rdSuccess ? (
            <Message variant="success">Rent Post Deleted</Message>
          ) : csSuccess ? (
            <Message variant="success">Community Service Post Deleted</Message>
          ) : psSuccess ? (
            <Message variant="success">Paid Service Post Deleted</Message>
          ) : null}
          <h1>Rent Posts</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Clicks</th>
                <th>WhatsApp Shares</th>
                <th>Email Shares</th>
                <th>Facebook Shares</th>
                <th>Twitter Shares</th>
                <th>Actions</th>
                <th>Promote Post</th>
              </tr>
            </thead>
            <tbody>
              {rentPosts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>{product.clicks}</td>
                  <td>{product.whatsappShares}</td>
                  <td>{product.emailShares}</td>
                  <td>{product.fbShares}</td>
                  <td>{product.twitterShares}</td>
                  <td>
                    {" "}
                    {rdloading ? (
                      <Loader />
                    ) : (
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteRentPostt(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                  <td>
                  <Button variant='light' className='btn-sm' onClick={()=>console.log("first")}>
                      Promote Post
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h1>Paid Services Posts</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Clicks</th>
                <th>WhatsApp Shares</th>
                <th>Email Shares</th>
                <th>Facebook Shares</th>
                <th>Twitter Shares</th>
                <th>Actions</th>
                <th>Promote Post</th>
              </tr>
            </thead>
            <tbody>
              {paidServices.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>{product.clicks}</td>
                  <td>{product.whatsappShares}</td>
                  <td>{product.emailShares}</td>
                  <td>{product.fbShares}</td>
                  <td>{product.twitterShares}</td>
                  <td>
                    {" "}
                    {psloading ? (   
                      <Loader />
                    ) : (
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deletePSPost(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                  <td>
                  <Button variant='light' className='btn-sm' onClick={()=>console.log("first")}>
                      Promote Post
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h1>Community Service Posts</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {communityServicePosts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>
                    {" "}
                    {csloading ? (
                      <Loader />
                    ) : (
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteCSPost(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Dashboard;
