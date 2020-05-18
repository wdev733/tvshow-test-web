import { combineReducers } from 'redux';

import tvshow from "./tvshow/reducer";

const reducers = combineReducers({
  tvshow
});

export default reducers;