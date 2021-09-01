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
      <td className=" align-middle  border-end" style={{ fontWeight: '500' }}>
        {name}
      </td>
      <td className=" align-middle text-center border-end">
        {qualities.map((quality, i) => {
          return <Quality key={i} {...quality} />
        })}
      </td>
      <td className="text-center border-end align-middle">{profession.name}</td>
      <td className="text-center border-end align-middle">
        {completedMeetings}
      </td>
      <td className="text-center border-end align-middle">{rate}</td>
      <td className=" align-middle text-center border-end">
        <Bookmark
          toggleBookMarkHanble={toggleBookMarkHanble}
          id={_id}
          status={status}
        />
      </td>
      <td className="text-center align-middle">
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
