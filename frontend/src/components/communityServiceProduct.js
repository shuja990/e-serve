import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const CSProduct = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{height:"450px"}}>
      <Link to={`/communityserviceposts/${product._id}`}>
        <Card.Img src={product.thumbnailImage} variant="top" style={{height:"250px",objectFit:"contain"}}/>
      </Link>

      <Card.Body>
        <Link to={`/communityserviceposts/${product._id}`}>
          <Card.Title as="h3">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as="h3">${product.price}</Card.Text> */}
        <Card.Text as="div">
          <Card.Title as="div">
            Added by:<strong>{product.createdBy.name}</strong>
          </Card.Title>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CSProduct;
