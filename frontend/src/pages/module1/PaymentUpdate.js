import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../actions/userActions'
import Message from '../../components/Message'

const PaymentUpdate = ({ location, history }) => {

  const dispatch = useDispatch()
 
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
    else{
        dispatch(updateUserProfile({id: userInfo._id,paymentsEnabled:true}))
    }
  }, [])



  return (
    <Container>
      <h1>Thank you for onboarding</h1>
        <Message variant="success">Payments have been enabled</Message>
    </Container>
  )
}

export default PaymentUpdate
