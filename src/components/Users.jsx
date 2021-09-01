import React, { useState } from 'react'
import Pagination from './Pagination'
import User from './User'
import { paginate } from '../utilits/paginate'
import PropTypes from 'prop-types'

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  const pageChangehandle = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const users = paginate(allUsers, currentPage, pageSize)
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избраное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return <User {...user} {...rest} key={user._id} />
          })}
        </tbody>
      </table>
      <Pagination
        itemsCount={allUsers.length}
        pageSize={pageSize}
        onPageChange={pageChangehandle}
        currentPage={currentPage}
      />
    </div>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired
}
export default Users
