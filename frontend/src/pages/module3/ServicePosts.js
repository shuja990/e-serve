import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  paidServicesList,
  deletePaidServiceAdmin,
} from "../../actions/paidServiceActions";
import { PAID_SERVICE_CREATE_RESET } from "../../constants/paidServiceConstants";

const ServicePostsAdmin = ({ history, match }) => {
  //   const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const { loading, error, paidServices } = paidServicesStoreList;

  const serviceDelete = useSelector((state) => state.paidServiceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = serviceDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(paidServicesList());
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deletePaidServiceAdmin(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Service Posts</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paidServices.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
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

export default ServicePostsAdmin;
