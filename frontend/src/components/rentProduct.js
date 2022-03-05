import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const RentProduct = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/rentposts/${product._id}`}>
        <Card.Img src={product.thumbnailImage} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/rentposts/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">${product.price}</Card.Text>
        <Card.Text as="div">
          <Card.Title as="div">
            Added by:<strong>{product.createdBy.name}</strong>
          </Card.Title>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RentProduct;
