import axios from "axios";
import { PAID_SERVICES_DELETE_FAIL, PAID_SERVICES_DELETE_REQUEST, PAID_SERVICES_DELETE_SUCCESS, PAID_SERVICES_LIST_ADD, PAID_SERVICES_LIST_FAIL, PAID_SERVICES_LIST_REQUEST, PAID_SERVICES_LIST_SUCCESS, PAID_SERVICE_CREATE_FAIL, PAID_SERVICE_CREATE_REQUEST, PAID_SERVICE_CREATE_SUCCESS, PAID_SERVICE_DETAILS_FAIL, PAID_SERVICE_DETAILS_REQUEST, PAID_SERVICE_DETAILS_SUCCESS, PAID_SERVICE_UPDATE_FAIL, PAID_SERVICE_UPDATE_REQUEST, PAID_SERVICE_UPDATE_SUCCESS } from "../constants/paidServiceConstants"
import { logout } from "./userActions";


export const paidServicesList = () => async (
  dispatch
) => {
  try {
    dispatch({ type: PAID_SERVICES_LIST_REQUEST })

    const { data } = await axios.get(
      `http://localhost:5000/api/paidservice`
    )
    dispatch({
      type: PAID_SERVICES_LIST_SUCCESS,
      payload: data.paidServices,
    })
  } catch (error) {
    dispatch({
      type: PAID_SERVICES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPaidService = (data) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICE_CREATE_REQUEST,
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
      const { dbData } = await axios.post(`http://localhost:5000/api/paidservice`, data, config)
      // const { data } = await axios.post(`/api/paidservice`, data, config)
      console.log("paid service data: "+ JSON.stringify(data));
      dispatch({
        type: PAID_SERVICE_CREATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: PAID_SERVICES_LIST_ADD,
        payload: data,
      })
      // console.log("db data paid service creation: "+ dbData);

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        // dispatch(logout())
      }
      dispatch({
        type: PAID_SERVICE_CREATE_FAIL,
        payload: message,
      })
    }
  }


  export const deletePaidService = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICES_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/paidservice/${id}`, config)
  
      dispatch({
        type: PAID_SERVICES_DELETE_SUCCESS,
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
        type: PAID_SERVICES_DELETE_FAIL,
        payload: message,
      })
    }
  }

  export const paidServicesListAnalytics = (id) => async (dispatch, getState) =>  {
    try {
      dispatch({ type: PAID_SERVICES_LIST_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/paidservice/myposts/${id}`,config
      )
      dispatch({
        type: PAID_SERVICES_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PAID_SERVICES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const deletePaidServiceAdmin = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICES_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/paidservice/admin/${id}`, config)
  
      dispatch({
        type: PAID_SERVICES_DELETE_SUCCESS,
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
        type: PAID_SERVICES_DELETE_FAIL,
        payload: message,
      })
    }
  }

  export const updatePSClicks =  (paidService) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICE_UPDATE_REQUEST,
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
     
      paidService.clicks= paidService.clicks+1
  
      const { data } = await axios.put(
        `http://localhost:5000/api/paidservice/updateclicks/${paidService._id}`,
        paidService,
        config
      )
  
      dispatch({
        type: PAID_SERVICE_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: PAID_SERVICE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PAID_SERVICE_UPDATE_FAIL,
        payload: message,
      })
    }
  }


  export const updatePSShares =  (paidService, socialType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICE_UPDATE_REQUEST,
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
        paidService.fbShares= paidService.fbShares+1
      }
      else if(socialType==='whatsapp'){
        paidService.whatsappShares= paidService.whatsappShares+1
      }
      else if(socialType==='twitter'){
        paidService.twitterShares= paidService.twitterShares+1
      }
      else if(socialType==='email'){
        paidService.emailShares= paidService.emailShares+1
      }
  
      const { data } = await axios.put(
        `http://localhost:5000/api/paidservice/updateclicks/${paidService._id}`,
        paidService,
        config
      )
  
      dispatch({
        type: PAID_SERVICE_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: PAID_SERVICE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PAID_SERVICE_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  
export const listPaidServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAID_SERVICE_DETAILS_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/api/paidservice/${id}`)

    dispatch({
      type: PAID_SERVICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type:PAID_SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
  

  export const updatePaidService = (paidService) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICE_UPDATE_REQUEST,
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
        `http://localhost:5000/api/paidservice/${paidService._id}`,
        paidService,
        config
      )
  
      dispatch({
        type: PAID_SERVICE_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: PAID_SERVICE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PAID_SERVICE_UPDATE_FAIL,
        payload: message,
      })
    }
  }