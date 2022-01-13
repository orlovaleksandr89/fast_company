import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'
import { isOutDated } from '../utilits/isOutDated'

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  lastFetch: null
}

/* Slice Reducer */

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState,
  reducers: {
    qualitiesRequested(state) {
      state.isLoading = true
    },
    qualitiesRecieved(state, action) {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequestFailure(state, action) {
      state.isLoading = false
    }
  }
})

const { actions, reducer: qualitiesReducer } = qualitiesSlice

const { qualitiesRequested, qualitiesRecieved, qualitiesRequestFailure } =
  actions

/* Functions to dispatch changes to state */

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  if (isOutDated(lastFetch)) {
    dispatch(qualitiesRequested())
    try {
      const { content } = await qualityService.get()
      dispatch(qualitiesRecieved(content))
    } catch (error) {
      dispatch(qualitiesRequestFailure(error.message))
    }
  }
}

/* Selectors to get current state instance */

export const getQualities = () => (state) => {
  return state.qualities.entities
}
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading

export const getQualitiesById = (qualities) => (state) => {
  if (state.qualities.entities) {
    return state.qualities.entities.filter((x) => qualities.includes(x._id))
  }
  return []
}

export default qualitiesReducer
