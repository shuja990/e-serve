import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import { Table } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { rentPostsListAnalytics } from "../../../actions/rentActions";
import { paidServicesListAnalytics } from "../../../actions/paidServiceActions";
const Dashboard = ({history}) => {
  const dispatch = useDispatch();
  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading: rentLoading, error: rentError, rentPosts } = rentPostList;
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const {
    loading: paidLoading,
    error: paidError,
    paidServices,
  } = paidServicesStoreList;
  console.log(rentPosts);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if(userInfo){
      dispatch(rentPostsListAnalytics(userInfo._id));
      dispatch(paidServicesListAnalytics(userInfo._id))
    }
    else{
      history.push('/login')
    }

  }, [dispatch, userInfo._id, userInfo]);

  return (
    <>
      {rentLoading || paidLoading ? (
        <Loader />
      ) : rentError ? (
        <Message variant="danger">{rentError}</Message>
      ) : paidError ? (
        <Message variant="danger">{paidError}</Message>
      ) : (
        <>
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
