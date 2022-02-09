import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import axios from 'axios'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import { createPaidService } from '../../actions/paidServiceActions'

const CreatePaidService = ({ history, match }) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [thumbnailImage, setThumbnailImage] = useState('')
    const [keywords, setKeywords] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [uploading, setUploading] = useState(false)

    
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })

    // if (!userInfo || !userInfo.isAdmin) {
    //   history.push('/login')
    // }

    // if (successCreate) {
    //   history.push(`/admin/product/${createdProduct._id}/edit`)
    // } else {
    //   dispatch(listProducts('', pageNumber))
    // }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setThumbnailImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    
    dispatch(createPaidService(
        {
            _id: Math.floor(Math.random() * 10000000),
            title,
            price,
            thumbnailImage,
            keywords,
            category,
            description,
            location
          }
    ))

    history.push('/paidservices')

    // dispatch(
    //   updateProduct({
    //     _id: productId,
    //     name,
    //     price,
    //     thumbnailImage,
    //     brand,
    //     category,
    //     description,
    //     countInStock,
    //   })
    // )
  }

  return (
    <>
       <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1>Create Service</h1>

        {/* {loadingUpdate && <Loader />} */}
        {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
        {
        // loading 
        false
        ?
         (
          <Loader />
        ) :
        //  error
        false
          ? (
          <Message variant='danger'>
              {/* {error} */}
              error
              </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>thumbnailImage</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={thumbnailImage}
                onChange={(e) => setThumbnailImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Keywords</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter keywords'
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CreatePaidService
