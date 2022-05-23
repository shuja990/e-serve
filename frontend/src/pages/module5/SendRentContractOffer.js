import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { addRentPost } from "../../actions/rentActions";
import { RENT_CREATE_RESET } from "../../constants/rentConstants";
import { useHistory } from "react-router-dom";
const SendRentContractOffer = ({product}) => {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [months,setMonths] = useState(0)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("") 
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    useEffect(() => {
      if (!userInfo || !product) {
        history.push('/login')
      }
    }, [dispatch, history]);

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
          setLoading(true)
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
          const { data } = await axios.post(`http://localhost:5000/api/offers`,{
              price:price,
              title:title,
              noOfMonths:months,
              rentedItem:product._id,
              rentedBy: userInfo._id,
              rentedFrom:product.createdBy
          }, config) 
          if(data){
              setLoading(false)
          }
      } catch (error) {
          setError(error.message)
      }

    };
  
    return (
      <> 

          <h1>Send Offer for Rent Post</h1>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="name"
                  required
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="months">
                <Form.Label>No of Months</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Number of Months"
                  value={months}
                  required
                  onChange={(e) => setMonths(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Button type="submit" variant="primary">
                Send Offer
              </Button>
            </Form>
          )}
      </>
    )
}

export default SendRentContractOffer