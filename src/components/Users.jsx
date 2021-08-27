import React from 'react'

import User from './User'

const Users = ({ users, ...rest }) => {
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился,раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'>Избраное</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return <User {...user} i={i} {...rest} key={user._id} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
