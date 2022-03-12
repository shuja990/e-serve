import axios from "axios";
import { RENT_DELETE_FAIL, RENT_DELETE_REQUEST, RENT_DELETE_SUCCESS, RENT_LIST_ADD, RENT_LIST_FAIL, RENT_LIST_REQUEST, RENT_LIST_SUCCESS, RENT_CREATE_FAIL, RENT_CREATE_REQUEST, RENT_CREATE_SUCCESS, RENT_DETAILS_FAIL, RENT_DETAILS_REQUEST, RENT_DETAILS_SUCCESS, RENT_UPDATE_FAIL, RENT_UPDATE_REQUEST, RENT_UPDATE_SUCCESS } from "../constants/rentConstants"
import { logout } from "./userActions";


export const rentPostsList = () => async (
  dispatch
) => {
  try {
    dispatch({ type: RENT_LIST_REQUEST })

    const { data } = await axios.get(
      `http://localhost:5000/api/rent`
    )
      console.log("paid services from db: " +  JSON.stringify(data));
    dispatch({
      type: RENT_LIST_SUCCESS,
      payload: data.products,
    })
  } catch (error) {
    dispatch({
      type: RENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addRentPost = (data) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RENT_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()

      data.createdBy= userInfo;
      data.user= userInfo;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { dbData } = await axios.post(`http://localhost:5000/api/rent`, data, config)
      // const { data } = await axios.post(`/api/paidservice`, data, config)
      console.log("paid service data: "+ JSON.stringify(data));
      dispatch({
        type: RENT_CREATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: RENT_LIST_ADD,
        payload: data,
      })
      // console.log("db data paid service creation: "+ dbData);

    } catch (error) {
      console.log(error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        // dispatch(logout())
      }
      dispatch({
        type: RENT_CREATE_FAIL,
        payload: message,
      })
    }
  }


  export const deleteRentPost = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RENT_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/rent/${id}`, config)
  
      dispatch({
        type: RENT_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        // dispatch(logout())
        alert("Not authorized, token failed")
      }
      dispatch({
        type: RENT_DELETE_FAIL,
        payload: message,
      })
    }
  }

  export const deleteRentPostAdmin = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RENT_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/rent/admin/${id}`, config)
  
      dispatch({
        type: RENT_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        // dispatch(logout())
        alert("Not authorized, token failed")
      }
      dispatch({
        type: RENT_DELETE_FAIL,
        payload: message,
      })
    }
  }


  export const updateRentClicks =  (rentpost) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RENT_UPDATE_REQUEST,
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
      rentpost.clicks= rentpost.clicks+1

  
      const { data } = await axios.put(
        `/api/rent/${rentpost._id}`,
        rentpost,
        config
      )
      dispatch({
        type: RENT_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: RENT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: RENT_UPDATE_FAIL,
        payload: message,
      })
    }
  }

  export const updateRentShares =  (rentpost, socialType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RENT_UPDATE_REQUEST,
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
      if(socialType==='fb'){
        rentpost.fbShares= rentpost.fbShares+1
      }
      else if(socialType==='whatsapp'){
        rentpost.whatsappShares= rentpost.whatsappShares+1
      }
      else if(socialType==='twitter'){
        rentpost.twitterShares= rentpost.twitterShares+1
      }
      else if(socialType==='email'){
        rentpost.emailShares= rentpost.emailShares+1
      }
     

  
      const { data } = await axios.put(
        `/api/rent/${rentpost._id}`,
        rentpost,
        config
      )
      dispatch({
        type: RENT_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: RENT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: RENT_UPDATE_FAIL,
        payload: message,
      })
    }
  }

  
export const listRentPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RENT_DETAILS_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/api/rent/${id}`)
console.log("ss",data);
    dispatch({
      type: RENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type:RENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
  

  export const updateRentPost = (rentpost) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RENT_UPDATE_REQUEST,
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
  
      const { data } = await axios.put(
        `/api/rent/${rentpost._id}`,
        rentpost,
        config
      )
  
      dispatch({
        type: RENT_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: RENT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: RENT_UPDATE_FAIL,
        payload: message,
      })
    }
  }