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
import { createPaidService } from '../../actions/paidServiceActions'
import { PAID_SERVICE_CREATE_RESET } from '../../constants/paidServiceConstants'

const CreatePaidService = ({ history, match }) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [thumbnailImage, setThumbnailImage] = useState('')
    const [keywords, setKeywords] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [uploading, setUploading] = useState(false)
    const [serviceType, setServiceType] = useState("Digital");
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [locationError,setLocationError] = useState('')



    
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

  // useEffect(() => {
  //   dispatch({ type: PRODUCT_CREATE_RESET })

  //   if (!userInfo || !userInfo.isAdmin) {
  //     history.push('/login')
  //   }

  //   if (successCreate) {
  //     history.push(`/admin/product/${createdProduct._id}/edit`)
  //   } else {
  //     dispatch(listProducts('', pageNumber))
  //   }
  // }, [
  //   dispatch,
  //   history,
  //   userInfo,
  //   successDelete,
  //   successCreate,
  //   createdProduct,
  //   pageNumber,
  // ])

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

      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config)

      setThumbnailImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      
      let location = navigator.geolocation.getCurrentPosition(showLocation,showError);
      console.log(location);
    } else { 
      setLocationError("Geolocation is not supported by this browser.");
    }
  }
  const showLocation = (loc) => {
    setCoordinates({lat:loc.coords.latitude.toString(),lon:loc.coords.longitude.toString()})
  }
  function showError(e) {
    switch(e.code) {
      case e.PERMISSION_DENIED:
        setLocationError("User denied the request for Geolocation.")
        break;
      case e.POSITION_UNAVAILABLE:
        setLocationError("Location information is unavailable.")
        break;
      case e.TIMEOUT:
        setLocationError("The request to get user location timed out.")
        break;
      case e.UNKNOWN_ERROR:
        setLocationError("An unknown error occurred.")
        break;
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
            location,
            serviceType,
            coordinates

          }
    ))

    history.push('/paidservices')

  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successCreate) { 
      history.push("/paidservices");
      dispatch({
        type: PAID_SERVICE_CREATE_RESET
      })
    }
  }, [dispatch, history,successCreate,successDelete,userInfo]);

  return (
    <>
       <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1>Create Paid Service</h1>

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
                required
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
                required
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>thumbnailImage</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter image url'
                value={thumbnailImage}
                onChange={(e) => setThumbnailImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                id='image-file'
                type="file"
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
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
                required
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 mt-4">
      <Form.Label htmlFor="">Service Type</Form.Label>
      <Form.Control as="select" onChange={(e)=> setServiceType(e.target.value)}  >
        <option value='Digital' >Digital</option>
        <option value='Offline' >Offline</option>
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="coordinates">
              <Form.Label>Coordinates</Form.Label>
              <Form.Control
                type="text"
                placeholder="Latitude"
                value={coordinates.lat}
                onChange={(e) =>
                  setCoordinates({ ...coordinates, lat: e.target.value })
                }
              ></Form.Control>
              <Form.Control
                type="text"
                placeholder="Longitude"
                value={coordinates.lon}
                onChange={(e) =>
                  setCoordinates({ ...coordinates, lon: e.target.value })
                }
              ></Form.Control>
              <Button type="button" className="mb-2 mt-2" variant="primary" onClick={getLocation}>
                Get Location
              </Button>
              {
                locationError && <Message variant="danger" >{locationError}</Message>
              }
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
