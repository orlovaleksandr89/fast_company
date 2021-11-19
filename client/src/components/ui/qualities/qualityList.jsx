import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const QualityList = ({ qualities: qualitiesArr }) => {
  const { qualities } = useQualities()

  const intersection = qualities.filter((x) => qualitiesArr.includes(x._id))
  return (
    <>
      {intersection.map((quality, i) => {
        return <Quality key={i} {...quality} />
      })}
    </>
  )
}
QualityList.propTypes = {
  qualities: PropTypes.array
}
export default QualityList
