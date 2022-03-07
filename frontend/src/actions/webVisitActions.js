import { GET_WEB_VISIT_COUNTS, WEB_VISIT_FAIL } from "../constants/webVisitConstants";
import axios from 'axios'

export const getWebVisits = () => async (
    dispatch
  ) => {
    try {
      
  
      const { data } = await axios.get(
        `http://localhost:5000/api/visits/62256a16baea893c142a52ff`
      )
        // alert("WEBVISITS: " + (JSON.stringify(data.webVisits.numOfVisits)));
      dispatch({
        type: GET_WEB_VISIT_COUNTS,
        payload: data.webVisits.numOfVisits,
      })
    } catch (error) {
      dispatch({
        type: WEB_VISIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const addWebVisits = () => async (
    dispatch
  ) => {
    try {
      
  
      const { data } = await axios.get(
        `http://localhost:5000/api/visits/62256a16baea893c142a52ff`
      )
      data.webVisits.numOfVisits= data.webVisits.numOfVisits + 1

       const { updatedData } = await axios.put(
        `http://localhost:5000/api/visits/62256a16baea893c142a52ff`,
        data
      )
      dispatch({
        type: GET_WEB_VISIT_COUNTS,
        payload: updatedData.webVisits.numOfVisits,
      })
    } catch (error) {
      dispatch({
        type: WEB_VISIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  
