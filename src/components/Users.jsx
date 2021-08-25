import React, { useState } from 'react'
import api from '../API'
import { renderPhrase, spanClass } from '../utilits/helpers'
import TableRow from './TableRow'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const deleteUserHandler = (value) => {
    const filtered = users.filter((user) => user._id !== value)
    setUsers(filtered)
  }

  return (
    <div>
      <span
        style={{ fontSize: '20px', margin: '20px' }}
        className={spanClass(users.length)}
      >
        {renderPhrase(users.length)}
      </span>
      <table className='table'>
        <thead>
          <TableRow
            tableHead={[
              '',
              'Имя',
              'Качества',
              'Профессия',
              'Встретился,раз',
              'Оценка',
              '',
            ]}
          />
        </thead>
        <tbody>
          <TableRow
            tableData={users}
            onDelete={(id) => {
              deleteUserHandler(id)
            }}
          />
        </tbody>
      </table>
    </div>
  )
}

export default Users
