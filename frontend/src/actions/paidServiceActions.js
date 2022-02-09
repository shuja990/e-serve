import axios from "axios";
import { PAID_SERVICES_DELETE_FAIL, PAID_SERVICES_DELETE_REQUEST, PAID_SERVICES_DELETE_SUCCESS, PAID_SERVICES_LIST_ADD, PAID_SERVICES_LIST_FAIL, PAID_SERVICES_LIST_REQUEST, PAID_SERVICES_LIST_SUCCESS, PAID_SERVICE_CREATE_FAIL, PAID_SERVICE_CREATE_REQUEST, PAID_SERVICE_CREATE_SUCCESS } from "../constants/paidServiceConstants"


export const paidServicesList = () => async (
  dispatch
) => {
  try {
    dispatch({ type: PAID_SERVICES_LIST_REQUEST })

    const { data } = await axios.get(
      `http://localhost:5000/api/paidservice`
    )
      console.log("paid services from db: " +  JSON.stringify(data));
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
      const { dbData } = await axios.post(`/api/paidservice`, data, config)
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
  
      await axios.delete(`/api/paidservice/${id}`, config)
  
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


  
