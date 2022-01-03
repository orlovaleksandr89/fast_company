import React from 'react'
import QualityList from '../ui/qualities/qualityList'
import PropTypes from 'prop-types'

function QualityCard({ qualities }) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <QualityList qualities={qualities} />
        </p>
        <div></div>
      </div>
    </div>
  )
}
QualityCard.propTypes = {
  qualities: PropTypes.array
}
export default QualityCard
