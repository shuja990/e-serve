import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import RentProduct from '../../components/rentProduct'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { rentPostsList } from '../../actions/rentActions'

const RentPosts = ({ match }) => {

  const dispatch = useDispatch()

  const rentPostList = useSelector((state) => state.rentPosts)
  const { loading, error, rentPosts } = rentPostList
console.log(rentPosts);
  useEffect(() => {
    dispatch(rentPostsList())
  }, [dispatch])
 
  return (
    <>
      <h1>Latest Rent Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {rentPosts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <RentProduct product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default RentPosts
