import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaidServiceCard from "../../components/PaidServiceCard/PaidServiceCard";

function PaidServices() {
  const paidServices = useSelector(
    (state) => state.paidServiceList.paidServices
  );

  console.log(JSON.stringify(paidServices))
  console.log(paidServices)
  return (
    <div className="height-full ">
      <div class="container">
        {paidServices.length > 0
          ? 
          <Row>
         { paidServices.map((ps, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
             <PaidServiceCard paidService={ps} />
          </Col>
            ))}
            </Row>
          :
           ""
           }

      </div>
    </div>
  );
}

export default PaidServices;
