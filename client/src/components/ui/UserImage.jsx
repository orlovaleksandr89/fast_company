import React, { useState } from 'react'
import PropTypes from 'prop-types'

function UserImage({ image }) {
  const [userImage] = useState(
    image ||
      `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`
  )
  return (
    <img
      src={userImage}
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
