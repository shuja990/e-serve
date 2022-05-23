import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listRentContracts } from '../../actions/rentContractActions'

const RentContracts = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  console.log(orderList);
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listRentContracts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Rent Contracts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Rented By</th>
              <th>Rented From</th>
              <th>Price</th>
              <th>PAID</th>
              <th>Contract Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.rent?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.rentedBy.name}</td>
                <td>{order.rentedFrom.name}</td>
                <td>${order.price}</td>
                <td>
                  {order.isPaid ? (
                    'Paid'
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                    {order.contractStatus}
                </td>
                <td>
                  <LinkContainer to={`/rentcontract/${order._id}`}>
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

export default RentContracts
