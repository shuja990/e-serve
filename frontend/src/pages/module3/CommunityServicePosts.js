import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  communityServicePostsList,
  deletecommunityServicePostAdmin
} from '../../actions/communityServiceActions'
import { COMMUNITY_SERVICE_CREATE_RESET } from '../../constants/communityServiceConstants'

const CommunityServicePostAdmin = ({ history, match }) => {
//   const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const cspostslist = useSelector((state) => state.communityServicePosts)
  const { loading, error, communityServicePosts } = cspostslist


  const rentDelete = useSelector((state) => state.communityServicePostDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = rentDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: COMMUNITY_SERVICE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    else{
        dispatch(communityServicePostsList())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletecommunityServicePostAdmin(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Community Service Posts</h1>
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
                <th>DESCRIPTION</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {communityServicePosts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
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

export default CommunityServicePostAdmin
