import React from 'react'
const Loader = () => {
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
