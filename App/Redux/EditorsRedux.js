import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  editorsAddVideos: ["videos"],
  editorsRequest: ["data"],
  editorsSuccess: ["payload"],
  editorsFailure: null,
});

export const EditorsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  videos: [],
});

/* ------------- Selectors ------------- */

export const EditorsSelectors = {
  getData: state => state.data,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const addVideos = (state, action) => {
  const { videos } = action;
  return state.merge({ videos });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EDITORS_ADD_VIDEOS]: addVideos,
  [Types.EDITORS_REQUEST]: request,
  [Types.EDITORS_SUCCESS]: success,
  [Types.EDITORS_FAILURE]: failure,
});
