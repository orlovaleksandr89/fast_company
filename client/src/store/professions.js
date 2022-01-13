import { createSlice } from '@reduxjs/toolkit'
import { isOutDated } from '../utilits/isOutDated'
import professionsServices from '../services/profession.service'

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  lastFetch: null
}

const professionSlice = createSlice({
  name: 'professions',
  initialState,
  reducers: {
    professionsRequested(state) {
      state.isLoading = true
    },
    professionsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    professionsRecieved(state, action) {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    }
  }
})

const { actions, reducer: professionsReducer } = professionSlice
const { professionsRequested, professionsRequestFailed, professionsRecieved } =
  actions

/* Functions to dispatch changes to state */

export const loadProfessions = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested())

    try {
      const { content } = await professionsServices.get()
      dispatch(professionsRecieved(content))
    } catch (error) {
      dispatch(professionsRequestFailed(error.message))
    }
  }
}

/* Selectors to get current status */
export const getProfessionsList = () => (state) => {
  return state.professions.entities
}
export const getProfessionsLoadingStatus = () => (state) => {
  return state.professions.isLoading
}
export const getProfessionsById = (profId) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((prof) => prof._id === profId)
  }
}

export default professionsReducer
