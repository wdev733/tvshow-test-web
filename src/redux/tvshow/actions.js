import {
  TVSHOW_LIST,
  TVSHOW_LIST_SUCCESS,
  TVSHOW_GET,
  TVSHOW_GET_SUCCESS,
} from "Constants/actionTypes";

export const tvshowList = (search) => ({
  type: TVSHOW_LIST,
  payload: { search },
});

export const tvshowListSuccess = (tvshowList) => ({
  type: TVSHOW_LIST_SUCCESS,
  payload: { tvshowList },
});

export const tvshowGet = (id, callback) => ({
  type: TVSHOW_GET,
  payload: { id, callback },
});

export const tvshowGetSuccess = () => ({
  type: TVSHOW_GET_SUCCESS,
});
