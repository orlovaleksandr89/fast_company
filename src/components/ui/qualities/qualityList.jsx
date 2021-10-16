import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'

const QualityList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality, i) => {
        return <Quality key={i} {...quality} />
      })}
    </>
  )
}
QualityList.propTypes = {
  qualities: PropTypes.array
}
export default QualityList
