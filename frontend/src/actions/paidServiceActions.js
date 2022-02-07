import { PAID_SERVICES_LIST_ADD, PAID_SERVICE_CREATE_FAIL, PAID_SERVICE_CREATE_REQUEST, PAID_SERVICE_CREATE_SUCCESS } from "../constants/paidServiceConstants"

export const createPaidService = (data) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAID_SERVICE_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
    //   const { data } = await axios.post(`/api/createpaidservice`, {}, config)
      console.log("paid service data: "+ JSON.stringify(data));
      dispatch({
        type: PAID_SERVICE_CREATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: PAID_SERVICES_LIST_ADD,
        payload: data,
      })
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