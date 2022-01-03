import React from 'react'
import PropTypes from 'prop-types'

function UserImage({ image }) {
  return (
    <img
      src={image}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      width="65"
      height="65"
    />
  )
}
UserImage.propTypes = {
  image: PropTypes.string
}

export default UserImage
