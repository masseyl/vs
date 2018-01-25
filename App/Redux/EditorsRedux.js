import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Platform } from 'react-native'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  editorsAddVideos: ['videos'],
  editorsDragVideos: ['videos'],
  editorsUpdateVideoSource: ['video'],
  editorsRequest: ['data'],
  editorsSuccess: ['payload'],
  editorsFailure: null
})

export const EditorsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  videos: []
})

/* ------------- Selectors ------------- */

export const EditorsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

// ************VIDEO EDITOR REDUCERS
export const addVideos = (state, action) => {
  const { videos } = action
  if (Platform.OS === 'ios') {
    // ios can select multiple videos
    return state.merge({ videos })
  } else {
    // android can only select one at a time so must be built slowly
    let newVideos = Immutable.asMutable(state.videos)
    newVideos.push(videos)
    return state.merge({ videos: newVideos })
  }
}

export const dragVideos = (state, action) => {
  const paths = action.videos.itemOrder
  let newVideos = []
  for (let item in paths) {
    let path = {
      path: paths[item].key
    }
    newVideos.push(path)
  }
  return state.merge({ videos: newVideos })
}

export const updateVideoSource = (state, action) => {
  const { newSource, oldSource } = action.video
  let newVideos = Immutable.asMutable(state.videos)
  for (let vid in newVideos) {
    if (newVideos[vid].path === oldSource) {
      let video = Immutable.asMutable(newVideos[vid])
      video.path = newSource
      newVideos[vid] = video
    }
  }
  return state.merge({ videos: newVideos })
}

// VIDEO EDITOR REDUCERS end *********

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EDITORS_ADD_VIDEOS]: addVideos,
  [Types.EDITORS_DRAG_VIDEOS]: dragVideos,
  [Types.EDITORS_UPDATE_VIDEO_SOURCE]: updateVideoSource,
  [Types.EDITORS_REQUEST]: request,
  [Types.EDITORS_SUCCESS]: success,
  [Types.EDITORS_FAILURE]: failure
})
