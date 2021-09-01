import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ toggleBookMarkHanble, id, status }) => {
  return (
    <button
      className="btn btn-lg  "
      onClick={() => {
        toggleBookMarkHanble(id)
      }}
    >
      {<i className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}></i>}
    </button>
  )
}
Bookmark.propTypes = {
  toggleBookMarkHanble: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool
}
export default Bookmark
