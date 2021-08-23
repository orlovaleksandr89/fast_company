import React, { useState } from 'react'
import api from '../API'
import TableRow from './TableRow'
import { renderPhrase, spanClass } from '../utilits/helpers'

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
          <tr>
            <th scope='col'></th>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился,раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            users={users}
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
