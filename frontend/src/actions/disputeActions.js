import axios from 'axios'
import { DISPUTES_GET_FAIL, DISPUTES_GET_REQUEST, DISPUTES_GET_SUCCESS, DISPUTE_CREATE_FAIL, DISPUTE_CREATE_REQUEST, DISPUTE_CREATE_SUCCESS, DISPUTE_GET_FAIL, DISPUTE_GET_REQUEST, DISPUTE_GET_SUCCESS, DISPUTE_IS_SELLER_SERVICE_CREATE_FAIL, DISPUTE_IS_SELLER_SERVICE_CREATE_SUCCESS, DISPUTE_IS_SELLER_SERVICE_REQUEST, DISPUTE_RESOLVE_FAIL, DISPUTE_RESOLVE_REQUEST, DISPUTE_RESOLVE_SUCCESS, DISPUTE_UPDATE_FAIL, DISPUTE_UPDATE_REQUEST, DISPUTE_UPDATE_SUCCESS, IF_IN_DISPUTES_GET_FAIL, IF_IN_DISPUTES_GET_REQUEST, IF_IN_DISPUTES_GET_SUCCESS } from '../constants/disputeConstants'
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


  
export const updateDispute = (dispute, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISPUTE_UPDATE_REQUEST,
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

    const { data } = await axios.post(`/api/dispute/update/${id}`, dispute, config)
console.log('controller dispute updated: ', data)
    dispatch({
      type: DISPUTE_UPDATE_SUCCESS,
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
      type: DISPUTE_UPDATE_FAIL,
      payload: message,
    })
  }
}



export const resolveDispute = (dispute, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISPUTE_RESOLVE_REQUEST,
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

    const { data } = await axios.post(`/api/dispute/resolve/${id}`, dispute, config)
console.log('controller dispute updated: ', data)
    dispatch({
      type: DISPUTE_RESOLVE_SUCCESS,
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
      type: DISPUTE_RESOLVE_FAIL,
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

      console.log(data)
   
    
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
  
   
export const ifInDIsputes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IF_IN_DISPUTES_GET_REQUEST,
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

    const { data } = await axios.get(`/api/dispute/ifindisputes/${id}`, config)

    dispatch({
      type: IF_IN_DISPUTES_GET_SUCCESS,
      payload: data,
    })

    console.log("if in disputes: "+data)
 
  
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: IF_IN_DISPUTES_GET_FAIL,
      payload: message,
    })
  }
}


  
export const getDispute = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISPUTE_GET_REQUEST,
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

    const { data } = await axios.get(`/api/dispute/disputes/${id}`, config)
console.log(data);
    dispatch({
      type: DISPUTE_GET_SUCCESS,
      payload: data.dispute,
    })

    console.log(data.dispute)
 
  
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DISPUTE_GET_FAIL,
      payload: message,
    })
  }
}



