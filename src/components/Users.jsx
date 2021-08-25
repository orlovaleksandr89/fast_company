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
          {users.map((user, i) => {
            return (
              <TableRow
                user={user}
                i={i}
                onDelete={deleteUserHandler}
                key={user._id}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
