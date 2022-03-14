import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = (products) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return(
    <Carousel pause='hover' className='bg-dark'>
      {products?.products?.map((product) => (
        <Carousel.Item key={product?._id}>
          {/* <Link to={`/product/${product._id}`}> */}
            <Image src={product?.thumbnailImage} alt={product?.title} fluid />

          {/* </Link> */}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
