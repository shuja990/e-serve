import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { communityServicePostsList } from "../actions/communityServiceActions";
import { rentPostsList } from "../actions/rentActions";
import { paidServicesList } from "../actions/paidServiceActions";
import RentProduct from "../components/rentProduct";
import CSProduct from "../components/communityServiceProduct"
import PaidServiceCard from '../components/PaidServiceCard/PaidServiceCard'
const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading: rentLoading, error: rentError, rentPosts } = rentPostList;
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const {
    loading: paidLoading,
    error: paidError,
    paidServices,
  } = paidServicesStoreList;
  const cspostslist = useSelector((state) => state.communityServicePosts);
  const { loading, error, communityServicePosts } = cspostslist;
  useEffect(() => {
    dispatch(communityServicePostsList());
    dispatch(rentPostsList());
    dispatch(paidServicesList());
  }, [dispatch]);

  return (
    <>
      <Meta />
      {loading || paidLoading || rentLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : paidError ? (
        <Message variant="danger">{paidError}</Message>
      ) : rentError ? (
        <Message variant="danger">{rentError}</Message>
      ) : (
        <>
          {/* <ProductCarousel
            products={[rentPosts[0], communityServicePosts[0], paidServices[0]]}
          /> */}
          <h2 style={{backgroundColor: '#343A40',  color: 'white', paddingLeft:'20px', paddingRight:'20px', marginTop: '10px'}} > <Link to="/rentposts" style={{color: 'white'}} > Rent Posts</Link></h2>

          <Row>
            {rentPosts.map((product, id) => {
              if (id <= 3) {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <RentProduct product={product} />
                  </Col>
                );
              }
              else{
                return <div/>
              }
            })}
          </Row>
          <h2 style={{backgroundColor: '#343A40',  color: 'white', paddingLeft:'20px', paddingRight:'20px',  marginTop: '10px'}} > <Link to="/paidservices" style={{color: 'white'}}> Paid Services Posts</Link></h2>
          <Row>
            {paidServices.map((product, id) => {
              if (id <= 3) {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <PaidServiceCard paidService={product} />
                  </Col>
                );
              }
              else{
                return <div/>
              }
            })}
          </Row>
          <h2 style={{backgroundColor: '#343A40',  color: 'white', paddingLeft:'20px', paddingRight:'20px',  marginTop: '10px'}} > <Link to="/communityserviceposts" style={{color: 'white'}}> Community Service Posts</Link></h2>

          <Row>
            {communityServicePosts.map((product, id) => {
              if (id <= 3) {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <CSProduct product={product} />
                  </Col>
                );
              }
              else{
                return <div/>
              }
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
