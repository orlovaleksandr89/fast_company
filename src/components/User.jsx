import React from 'react'
import Quality from './quality'
import Bookmark from './Bookmark'

const User = ({
  _id,
  qualities,
  name,
  profession,
  completedMeetings,
  rate,
  i,
  onDelete,
  toggleBookMarkHanble,
  status,
}) => {
  return (
    <tr key={_id}>
      <th scope='row'>{i + 1}</th>
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
          className='btn btn-danger'
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

export default User
