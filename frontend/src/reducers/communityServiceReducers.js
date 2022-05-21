import {
  COMMUNITY_SERVICE_LIST_ADD,
  COMMUNITY_SERVICE_LIST_FAIL,
  COMMUNITY_SERVICE_LIST_REQUEST,
  COMMUNITY_SERVICE_LIST_SUCCESS,
  COMMUNITY_SERVICE_CREATE_FAIL,
  COMMUNITY_SERVICE_CREATE_REQUEST,
  COMMUNITY_SERVICE_CREATE_RESET,
  COMMUNITY_SERVICE_CREATE_SUCCESS,
  COMMUNITY_SERVICE_DETAILS_FAIL,
  COMMUNITY_SERVICE_DETAILS_REQUEST,
  COMMUNITY_SERVICE_DETAILS_SUCCESS,
  COMMUNITY_SERVICE_UPDATE_FAIL,
  COMMUNITY_SERVICE_UPDATE_REQUEST,
  COMMUNITY_SERVICE_UPDATE_RESET,
  COMMUNITY_SERVICE_UPDATE_SUCCESS,
  COMMUNITY_SERVICE_DELETE_REQUEST,
  COMMUNITY_SERVICE_DELETE_SUCCESS,
  COMMUNITY_SERVICE_DELETE_FAIL,
  COMMUNITY_SERVICE_DELETE_RESET,
} from "../constants/communityServiceConstants";

export const communityServicePostsReducer = (
  state = { communityServicePosts: [] },
  action
) => {
  switch (action.type) {
    case COMMUNITY_SERVICE_LIST_REQUEST:
      return { loading: true, communityServicePosts: [] };
    case COMMUNITY_SERVICE_LIST_SUCCESS:
      return {
        loading: false,
        communityServicePosts: action.payload,
      };
    case COMMUNITY_SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    // action.payload is an array itself
    case COMMUNITY_SERVICE_LIST_ADD:
      return {
        loading: true,
        communityServicePosts: [...state.communityServicePosts, action.payload],
      };
    default:
      return state;
  }
};

export const communityServicePostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMUNITY_SERVICE_CREATE_REQUEST:
      return { loading: true };
    case COMMUNITY_SERVICE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        communityServicePost: action.payload,
      };
    case COMMUNITY_SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMUNITY_SERVICE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const communityServicePostUpdateReducer = (
  state = { communityServicePost: {} },
  action
) => {
  switch (action.type) {
    case COMMUNITY_SERVICE_UPDATE_REQUEST:
      return { loading: true };
    case COMMUNITY_SERVICE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        communityServicePost: action.payload,
      };
    case COMMUNITY_SERVICE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMUNITY_SERVICE_UPDATE_RESET:
      return { communityServicePost: {} };
    default:
      return state;
  }
};

export const communityServicePostDetailsReducer = (
  state = { communityServicePost: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case COMMUNITY_SERVICE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COMMUNITY_SERVICE_DETAILS_SUCCESS:
      return { loading: false, communityServicePost: action.payload };
    case COMMUNITY_SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const communityServicePostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMUNITY_SERVICE_DELETE_REQUEST:
      return { loading: true };
    case COMMUNITY_SERVICE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMUNITY_SERVICE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMMUNITY_SERVICE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
