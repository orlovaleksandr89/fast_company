import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../../store/users'
import Loader from '../loader'
import PropTypes from 'prop-types'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessions } from '../../../store/professions'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getUserIsLoggedIn())
  const userLoadingStatus = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessions())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])

  if (userLoadingStatus) {
    return <Loader />
  }
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
