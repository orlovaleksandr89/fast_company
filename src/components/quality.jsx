import React from 'react'

const Quality = ({ _id, name, color }) => {
  return (
    <span
      style={{ margin: '3px 3px', fontSize: '14px' }}
      className={`badge bg-${color}`}
      key={_id}
    >
      {name}
    </span>
  )
}

export default Quality
