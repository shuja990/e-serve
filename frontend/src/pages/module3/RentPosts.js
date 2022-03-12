import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {
  rentPostsList,
  deleteRentPostAdmin
} from '../../actions/rentActions'
import { RENT_CREATE_RESET } from '../../constants/rentConstants'

const RentPostsAdmin = ({ history, match }) => {
//   const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const rentPostList = useSelector((state) => state.rentPosts)
  const { loading, error, rentPosts } = rentPostList

  const rentDelete = useSelector((state) => state.rentPostDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = rentDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: RENT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    else{
        dispatch(rentPostsList())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteRentPostAdmin(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Rent Posts</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rentPosts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default RentPostsAdmin
