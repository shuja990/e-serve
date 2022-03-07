import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { updateRentClicks } from "../actions/rentActions";
import { useDispatch } from "react-redux";

const RentProduct = ({ product }) => {
  const history= useHistory()
  const dispatch= useDispatch()

  const viewDetailsHandler=(id, rentProduct)=>{
    dispatch(updateRentClicks(rentProduct))
    history.push(`/rentposts/${id}`)
  }
  
  return (
    <Card onClick={()=>viewDetailsHandler(product._id, product)} className="my-3 p-3 rounded">
       
        <Card.Img src={product.thumbnailImage} variant="top" />
      

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
