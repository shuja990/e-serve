import { ADD_WEB_VISIT_COUNT, GET_WEB_VISIT_COUNTS, WEB_VISIT_FAIL } from "../constants/webVisitConstants"

export const webAppVisitReducer = (state = { paidServices: [] }, action) => {
    switch (action.type) {
      
      case GET_WEB_VISIT_COUNTS:
        return {
          webVisitCounts: action.payload,         
        }
        case ADD_WEB_VISIT_COUNT:
            return {
                webVisitCounts: action.payload+1,         
            }
      case WEB_VISIT_FAIL:
        return { error: action.payload }

      default:
        return state
    }
  }