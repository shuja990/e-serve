import { DISPUTES_GET_FAIL, DISPUTES_GET_REQUEST, DISPUTES_GET_RESET, DISPUTES_GET_SUCCESS, DISPUTE_GET_FAIL, DISPUTE_GET_REQUEST, DISPUTE_GET_RESET, DISPUTE_GET_SUCCESS, DISPUTE_IS_SELLER_SERVICE_CREATE_FAIL, DISPUTE_IS_SELLER_SERVICE_CREATE_RESET, DISPUTE_IS_SELLER_SERVICE_CREATE_SUCCESS, DISPUTE_IS_SELLER_SERVICE_REQUEST } from "../constants/disputeConstants"

export const isSellerServiceReducer = (state = {}, action) => {
    switch (action.type) {
      case DISPUTE_IS_SELLER_SERVICE_REQUEST:
        return {
          loading: true,
        }
      case DISPUTE_IS_SELLER_SERVICE_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          isSellerService: action.payload,
        }
      case DISPUTE_IS_SELLER_SERVICE_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      case DISPUTE_IS_SELLER_SERVICE_CREATE_RESET:
        return {}
      default:
        return state
    }
  }

  
export const getMyDisputesReducer = (state = {}, action) => {
    switch (action.type) {
      case DISPUTES_GET_REQUEST:
        return {
          loading: true,
        }
      case DISPUTES_GET_SUCCESS:
        return {
          loading: false,
          success: true,
          myDisputes: action.payload,
        }
      case DISPUTES_GET_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      case DISPUTES_GET_RESET:
        return {}
      default:
        return state
    }
  }

   
export const getDisputeReducer = (state = {}, action) => {
  switch (action.type) {
    case DISPUTE_GET_REQUEST:
      return {
        loading: true,
      }
    case DISPUTE_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        dispute: action.payload,
      }
    case DISPUTE_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DISPUTE_GET_RESET:
      return {}
    default:
      return state
  }
}