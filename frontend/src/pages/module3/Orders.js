import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyRentedFromItems, listMyRentedItems } from '../../actions/rentContractActions'

const MyRentedProducts = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderListMy)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyRentedFromItems())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Paid Service Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Price</th>
              <th>PAID</th>
              <th>Order Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.seller.name}</td>
                <td>{order.buyer.name}</td>
                <td>${order.orderItem.price}</td>
                <td>
                  {order.isPaid ? (
                    'Paid'
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                    {order.orderStatus}
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default MyRentedProducts
