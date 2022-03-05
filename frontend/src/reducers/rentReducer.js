import {
  RENT_LIST_ADD,
  RENT_LIST_FAIL,
  RENT_LIST_REQUEST,
  RENT_LIST_SUCCESS,
  RENT_CREATE_FAIL,
  RENT_CREATE_REQUEST,
  RENT_CREATE_RESET,
  RENT_CREATE_SUCCESS,
  RENT_DETAILS_FAIL,
  RENT_DETAILS_REQUEST,
  RENT_DETAILS_SUCCESS,
  RENT_UPDATE_FAIL,
  RENT_UPDATE_REQUEST,
  RENT_UPDATE_RESET,
  RENT_UPDATE_SUCCESS,
  RENT_DELETE_REQUEST,
  RENT_DELETE_SUCCESS,
  RENT_DELETE_FAIL,
} from "../constants/rentConstants";

export const rentPostsListReducer = (state = { rentPosts: [] }, action) => {
  switch (action.type) {
    case RENT_LIST_REQUEST:
      return { loading: true, rentPosts: [] };
    case RENT_LIST_SUCCESS:
      return {
        loading: false,
        rentPosts: action.payload,
      };
    case RENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    // action.payload is an array itself
    case RENT_LIST_ADD:
      return {
        loading: true,
        rentPosts: [...state.rentPosts, action.payload],
      };
    default:
      return state;
  }
};

export const rentPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RENT_CREATE_REQUEST:
      return { loading: true };
    case RENT_CREATE_SUCCESS:
      return { loading: false, success: true, rentPost: action.payload };
    case RENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const rentPostUpdateReducer = (state = { rentPost: {} }, action) => {
  switch (action.type) {
    case RENT_UPDATE_REQUEST:
      return { loading: true };
    case RENT_UPDATE_SUCCESS:
      return { loading: false, success: true, rentPost: action.payload };
    case RENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case RENT_UPDATE_RESET:
      return { rentPost: {} };
    default:
      return state;
  }
};

export const rentDetailsReducer = (
  state = { rentPost: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case RENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case RENT_DETAILS_SUCCESS:
      return { loading: false, rentPost: action.payload };
    case RENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const rentPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RENT_DELETE_REQUEST:
      return { loading: true };
    case RENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
