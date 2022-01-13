import { combineReducers, configureStore } from '@reduxjs/toolkit'
import commentsReducer from './comments'
import professionsReducer from './professions'
import qualitiesReducer from './qualities'
import userReducer from './users'

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: userReducer,
  comments: commentsReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
