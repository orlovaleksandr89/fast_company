import React from 'react'
import Quality from './quality'
import Bookmark from './Bookmark'
import PropTypes from 'prop-types'

const User = ({
  _id,
  qualities,
  name,
  profession,
  completedMeetings,
  rate,

  onDelete,
  toggleBookMarkHanble,
  status
}) => {
  return (
    <tr key={_id}>
      <td style={{ fontWeight: '500' }}>{name}</td>
      <td>
        {qualities.map((quality, i) => {
          return <Quality key={i} {...quality} />
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <Bookmark
          toggleBookMarkHanble={toggleBookMarkHanble}
          id={_id}
          status={status}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            onDelete(_id)
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
User.propTypes = {
  _id: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,

  onDelete: PropTypes.func.isRequired,
  toggleBookMarkHanble: PropTypes.func.isRequired,
  status: PropTypes.bool
}
export default User
