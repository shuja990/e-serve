import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import axios from 'axios'
const CSOffersSent = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const[loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [orders,setOrders] = useState([])
  useEffect(() => {
    if (userInfo) {
        getOffers()
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])
  const getOffers = async() => {
    try {
        setLoading(true)
      const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(`http://localhost:5000/api/communityservice/offers/collectedBy/${userInfo._id}`, config) 
        if(data){
            setOrders(data)
            setLoading(false)
        }
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <>
      <h1>Offers Sent</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Collected By </th>
              <th>Collected From</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.title}</td>
                <td>{order.collectedBy.name}</td>
                <td>{order.collectedFrom.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default CSOffersSent
