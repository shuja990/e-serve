import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { paidServicesList } from "../../actions/paidServiceActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import PaidServiceCard from "../../components/PaidServiceCard/PaidServiceCard";

function PaidServices() {
  const [keyword, setKeyword] = useState("");
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const { loading, error, paidServices } = paidServicesStoreList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(paidServicesList());
  }, [dispatch]);

  console.log(paidServices);
  return (
    <div className="height-full ">
      <div class="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Form className="d-flex">
              <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-1 ml-sm-5"
              ></Form.Control>
            </Form>{" "}
            <Row>
              {paidServices
                .filter((e) =>
                  e.title.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((ps, index) => (
                  <Col key={index} sm={12} md={6} lg={4} xl={3}>
                    <PaidServiceCard paidService={ps} />
                  </Col>
                ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

export default PaidServices;
