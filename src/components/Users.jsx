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
            <th scope="col" className="text-start align-middle">
              Имя
            </th>
            <th scope="col" className="text-start align-middle">
              Качества
            </th>
            <th scope="col" className="text-start align-middle">
              Профессия
            </th>
            <th scope="col" className="text-start align-middle">
              Встретился,раз
            </th>
            <th scope="col" className="text-start align-middle">
              Оценка
            </th>
            <th scope="col" className="text-start align-middle">
              Избраное
            </th>
            <th scope="col" className="text-start  align-middle"></th>
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
  users: PropTypes.array.is
}
export default Users
