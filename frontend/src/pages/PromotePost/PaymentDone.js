import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import axios from "axios";

const PaymentDone = ({ match, history }) => {
 
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    else{
        updateOrder()
    }
  }, [])

  const updateOrder = async () => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      console.log(userInfo.token);
      const { data } = await axios.post(`http://localhost:5000/api/promote/${match.params.id}`,{}, config)
  }

  return (
    <Container>
      <h1>Thank you for payment</h1>
        <Message variant="success">Payments has been made successfully</Message>
    </Container>
  )
}

export default PaymentDone
