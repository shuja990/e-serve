import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Table, Card } from "react-bootstrap";
import Loader from "../../components/Loader";
import { rentPostsList } from "../../actions/rentActions";
import { paidServicesList } from "../../actions/paidServiceActions";
import { getWebVisits } from "../../actions/webVisitActions";
const AdminDashboard = ({ history }) => {
  const dispatch = useDispatch();
  const webvisits = useSelector((state) => state.webVisits);
  const { loading, error, webVisitCounts } = webvisits;
  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading: rentLoading, error: rentError, rentPosts } = rentPostList;
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const {
    loading: paidLoading,
    error: paidError,
    paidServices,
  } = paidServicesStoreList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      dispatch(rentPostsList(userInfo._id));
      dispatch(paidServicesList(userInfo._id));
      dispatch(getWebVisits());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo._id, userInfo]);

  // console.log(webvisits)

  return (
    <>
      {false || false || false? (
        <Loader />
      ) : false ? (
        <Message variant="danger">{false}</Message>
      ) : false ? (
        <Message variant="danger">{false}</Message>
      )
      : false ? (
          <Message>{false}</Message>
      )
      : (
        <>
          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Header>Total Website Visits</Card.Header>
            <Card.Body>
              <Card.Title>{webVisitCounts} Visitor(s)</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
          </Card>
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

export default AdminDashboard;
