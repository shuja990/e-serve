import axios from "axios";
import { COMMUNITY_SERVICE_DELETE_FAIL, COMMUNITY_SERVICE_DELETE_REQUEST, COMMUNITY_SERVICE_DELETE_SUCCESS, COMMUNITY_SERVICE_LIST_ADD, COMMUNITY_SERVICE_LIST_FAIL, COMMUNITY_SERVICE_LIST_REQUEST, COMMUNITY_SERVICE_LIST_SUCCESS, COMMUNITY_SERVICE_CREATE_FAIL, COMMUNITY_SERVICE_CREATE_REQUEST, COMMUNITY_SERVICE_CREATE_SUCCESS, COMMUNITY_SERVICE_DETAILS_FAIL, COMMUNITY_SERVICE_DETAILS_REQUEST, COMMUNITY_SERVICE_DETAILS_SUCCESS, COMMUNITY_SERVICE_UPDATE_FAIL, COMMUNITY_SERVICE_UPDATE_REQUEST, COMMUNITY_SERVICE_UPDATE_SUCCESS } from "../constants/communityServiceConstants"
import { logout } from "./userActions";


export const communityServicePostsList = () => async (
  dispatch
) => {
  try {
    dispatch({ type: COMMUNITY_SERVICE_LIST_REQUEST })

    const { data } = await axios.get(
      `http://localhost:5000/api/communityservice`
    )
    dispatch({
      type: COMMUNITY_SERVICE_LIST_SUCCESS,
      payload: data.products,
    })
  } catch (error) {
    dispatch({
      type: COMMUNITY_SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addcommunityServicePost = (data) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMUNITY_SERVICE_CREATE_REQUEST,
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
      const { dbData } = await axios.post(`http://localhost:5000/api/communityservice`, data, config)
      // const { data } = await axios.post(`/api/paidservice`, data, config)
      console.log("paid service data: "+ JSON.stringify(data));
      dispatch({
        type: COMMUNITY_SERVICE_CREATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: COMMUNITY_SERVICE_LIST_ADD,
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
        type: COMMUNITY_SERVICE_CREATE_FAIL,
        payload: message,
      })
    }
  }


  export const deletecommunityServicePost = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMUNITY_SERVICE_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/communityservice/${id}`, config)
  
      dispatch({
        type: COMMUNITY_SERVICE_DELETE_SUCCESS,
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
        type: COMMUNITY_SERVICE_DELETE_FAIL,
        payload: message,
      })
    }
  }
  export const deletecommunityServicePostAdmin = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMUNITY_SERVICE_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`http://localhost:5000/api/communityservice/admin/${id}`, config)
  
      dispatch({
        type: COMMUNITY_SERVICE_DELETE_SUCCESS,
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
        type: COMMUNITY_SERVICE_DELETE_FAIL,
        payload: message,
      })
    }
  }


  
export const listcommunityServicePostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMUNITY_SERVICE_DETAILS_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/api/communityservice/${id}`)
// console.log("ss",data);
    dispatch({
      type: COMMUNITY_SERVICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type:COMMUNITY_SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
  

  export const updatecommunityServicePost = (communityServicepost) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMUNITY_SERVICE_UPDATE_REQUEST,
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
        `http://localhost:5000/api/communityservice/${communityServicepost._id}`,
        communityServicepost,
        config
      )
  
      dispatch({
        type: COMMUNITY_SERVICE_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: COMMUNITY_SERVICE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: COMMUNITY_SERVICE_UPDATE_FAIL,
        payload: message,
      })
    }
  }

  export const myCommunityServicePosts = (id) => async (dispatch, getState) =>  {
    try {
      dispatch({ type: COMMUNITY_SERVICE_LIST_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/communityservice/myposts/${id}`,config
      )
      dispatch({
        type: COMMUNITY_SERVICE_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: COMMUNITY_SERVICE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }