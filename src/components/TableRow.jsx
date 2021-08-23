import React from 'react'
const TableRow = ({ users, onDelete }) => {
  return users.map((user, i) => {
    return (
      <tr key={user._id}>
        <th scope='row'>{i + 1}</th>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => {
            return (
              <span className={`badge bg-${quality.color}`} key={quality._id}>
                {quality.name}
              </span>
            )
          })}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => {
              onDelete(user._id)
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  })
}

export default TableRow