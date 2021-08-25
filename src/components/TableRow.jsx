import React from 'react'

const TableRow = ({ tableHead = [], tableData = [], onDelete = null }) => {
  console.log(tableData)
  return (
    <>
      <tr>
        {tableHead.map((data, i) => {
          return (
            <th scope='col' key={i}>
              {data}
            </th>
          )
        })}
      </tr>
      {tableData.map((user, i) => {
        return (
          <tr key={user._id}>
            <th scope='row' key={i}>
              {i + 1}
            </th>
            <td style={{ fontWeight: '500' }}>{user.name}</td>
            <td>
              {user.qualities.map((quality) => {
                return (
                  <span
                    style={{ margin: '3px 3px', fontSize: '14px' }}
                    className={`badge bg-${quality.color}`}
                    key={quality._id}
                  >
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
      })}
    </>
  )
}

export default TableRow
