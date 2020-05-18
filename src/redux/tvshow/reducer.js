import {
  TVSHOW_LIST,
  TVSHOW_LIST_SUCCESS,
  TVSHOW_GET,
  TVSHOW_GET_SUCCESS,
} from "Constants/actionTypes";

const INIT_STATE = {
  tvshowList: [],
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TVSHOW_LIST:
      return { ...state, loading: true };
    case TVSHOW_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tvshowList: action.payload.tvshowList,
      };
    case TVSHOW_GET:
      return { ...state, loading: true };
    case TVSHOW_GET_SUCCESS:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
