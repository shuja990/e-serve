import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import axios from 'axios'
import { disputeOrder, isUserService } from '../../actions/disputeActions'
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrdersAsBuyer, listMyOrdersAsSeller } from '../../actions/orderActions'


function ConflictScreen({match}) {
  const [thumbnailImage, setThumbnailImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [disputeType, setDisputeType] = useState('rental')
  const [serviceType, setServiceType] = useState('')
  const [disputeCreatedBy, setDisputeCreatedBy] = useState('')
  const [sellerEvidence, setSellerEvidence] = useState('')
  const [buyerEvidence, setBuyerEvidence] = useState('')
  const [uploading, setUploading] = useState(false)

  const isSellerServiceBool= useSelector(state=> state.isSellerServiceStore.isSellerService)
  const isSellerServiceLoading= useSelector(state=> state.isSellerServiceStore.loading)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    loading: ordersLoading,
    error: ordersError,
    orders: buyersOrders,
  } = orderListMy;

  const dispatch= useDispatch()




useEffect(()=>{
  

    dispatch(isUserService(match.params.id))
    dispatch(listMyOrdersAsBuyer(userInfo._id)) 
    // dispatch(listMyOrdersAsSeller(userInfo._id)) 
 
  
    // if(isSellerServiceBool){
    //   setSellerEvidence(thumbnailImage)
    //     setBuyerEvidence(null)
    //   console.log("seller")

    // }
    // else{
    //   setBuyerEvidence(thumbnailImage)
    //   setSellerEvidence(null)
    //   console.log("buyer")
    // }
  // dispatch(isUserService(match.params.id))
  // alert(isSellerServiceBool)

},[])
  
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

  const submitHandler = (e) => {
    e.preventDefault()
   

    
    dispatch(disputeOrder(
        {
           
            title,
            disputeType,
            buyerEvidence: isSellerServiceBool?null:thumbnailImage,
            sellerEvidence:isSellerServiceBool?thumbnailImage:null ,
            message: description,
            serviceType,
            disputeCreatedBy: userInfo._id

          },
          match.params.id
    ))

    // history.push('/paidservices')

  }

  return (
    <div>
        <h1 className='text-center mb-5' >Conflict Resolution Desk</h1>
        <div className='d-flex  justify-content-between' >
            <div className="upload-evidence">
            <h2>Upload evidence and open dispute</h2>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='image'>
              <Form.Label>Evidence</Form.Label>
              
              <Form.Control
                id='image-file'
                type="file"
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className="mb-3 mt-4">
      <Form.Label htmlFor="">Dispute Type</Form.Label>
      <Form.Select id="" onChange={(e)=> setDisputeType(e.target.value)}  >
        <option value='rental' >Rental</option>
        <option value='paid service' >Paid Service</option>
      </Form.Select>
    </Form.Group>
            
            <Button className='mt-5' type='submit' variant='primary'>
              Open Dispute
            </Button>
            </Form>
            </div>
           

           <div className="resolve-dispute d-flex flex-column   ">
           <h2>Resolve Dispute</h2>
           
           <Button className='align-self-center mt-5' variant='success'>
              Resolve Dispute
            </Button>
           </div>
        </div>
    </div>
  )
}

export default ConflictScreen