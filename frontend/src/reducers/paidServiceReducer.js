import { PAID_SERVICES_LIST_ADD, PAID_SERVICES_LIST_FAIL, PAID_SERVICES_LIST_REQUEST, PAID_SERVICES_LIST_SUCCESS, PAID_SERVICE_CREATE_FAIL, PAID_SERVICE_CREATE_REQUEST, PAID_SERVICE_CREATE_RESET, PAID_SERVICE_CREATE_SUCCESS, PAID_SERVICE_DETAILS_FAIL, PAID_SERVICE_DETAILS_REQUEST, PAID_SERVICE_DETAILS_SUCCESS, PAID_SERVICE_UPDATE_FAIL, PAID_SERVICE_UPDATE_REQUEST, PAID_SERVICE_UPDATE_RESET, PAID_SERVICE_UPDATE_SUCCESS } from "../constants/paidServiceConstants"


export const paidServiceListReducer = (state = { paidServices: [] }, action) => {
    switch (action.type) {
      case PAID_SERVICES_LIST_REQUEST:
        return { loading: true, paidServices: [] }
      case PAID_SERVICES_LIST_SUCCESS:
        return {
          loading: false,
          paidServices: action.payload,
           
        }
      case PAID_SERVICES_LIST_FAIL:
        return { loading: false, error: action.payload }
// action.payload is an array itself
      case PAID_SERVICES_LIST_ADD:
        return { loading: true, paidServices: [...state.paidServices, action.payload] }
      default:
        return state
    }
  }
  
export const paidServiceCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PAID_SERVICE_CREATE_REQUEST:
        return { loading: true }
      case PAID_SERVICE_CREATE_SUCCESS:
        return { loading: false, success: true, paidService: action.payload }
      case PAID_SERVICE_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case PAID_SERVICE_CREATE_RESET:
        return {}
      default:
        return state
    }
  }



  export const paidServiceUpdateReducer = (state = { paidService: {} }, action) => {
    switch (action.type) {
      case PAID_SERVICE_UPDATE_REQUEST:
        return { loading: true }
      case PAID_SERVICE_UPDATE_SUCCESS:
        return { loading: false, success: true, paidService: action.payload }
      case PAID_SERVICE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case PAID_SERVICE_UPDATE_RESET:
        return { paidService: {} }
      default:
        return state
    }
  }


  export const paidServiceDetailsReducer = (
    state = { paidService: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case PAID_SERVICE_DETAILS_REQUEST:
        return { ...state, loading: true }
      case PAID_SERVICE_DETAILS_SUCCESS:
        return { loading: false, paidService: action.payload }
      case PAID_SERVICE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
