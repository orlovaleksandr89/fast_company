import React, { useEffect } from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualitiesById,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'
import Loader from '../loader'

const QualityList = ({ qualities: qualitiesArr }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesById = useSelector(getQualitiesById(qualitiesArr))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      {qualitiesById.map((quality) => {
        return <Quality key={quality._id} {...quality} />
      })}
    </>
  )
}
QualityList.propTypes = {
  qualities: PropTypes.array
}
export default React.memo(QualityList)
