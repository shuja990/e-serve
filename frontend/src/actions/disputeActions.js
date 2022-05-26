import axios from 'axios'
import { DISPUTES_GET_FAIL, DISPUTES_GET_REQUEST, DISPUTES_GET_SUCCESS, DISPUTE_CREATE_FAIL, DISPUTE_CREATE_REQUEST, DISPUTE_CREATE_SUCCESS, DISPUTE_IS_SELLER_SERVICE_CREATE_FAIL, DISPUTE_IS_SELLER_SERVICE_CREATE_SUCCESS, DISPUTE_IS_SELLER_SERVICE_REQUEST } from '../constants/disputeConstants'
import { logout } from './userActions'

export const disputeOrder = (dispute, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISPUTE_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`http://localhost:5000/api/dispute/${id}`, dispute, config)
  
      dispatch({
        type: DISPUTE_CREATE_SUCCESS,
        payload: data,
      })
   
    
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: DISPUTE_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  
export const isUserService = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISPUTE_IS_SELLER_SERVICE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:5000/api/dispute/${id}/isuserservice`, config)
      dispatch({
            type: DISPUTE_IS_SELLER_SERVICE_CREATE_SUCCESS,
            payload: data.service.seller._id === userInfo._id,
          })
     
       
  
      
    
    } catch (error) {
      const message =  
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: DISPUTE_IS_SELLER_SERVICE_CREATE_FAIL,
        payload: message,
      })
    }
  }
  

  
export const getMyDisputes = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DISPUTES_GET_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`http://localhost:5000/api/dispute/${id}`, config)
  
      dispatch({
        type: DISPUTES_GET_SUCCESS,
        payload: data,
      })
   
    
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: DISPUTES_GET_FAIL,
        payload: message,
      })
    }
  }
  
  