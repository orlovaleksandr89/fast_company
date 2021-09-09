import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import User from './User'
import { paginate } from '../utilits/paginate'
import PropTypes from 'prop-types'

const Users = ({ users: allUsers, selectedProf, setCount, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 2

  const filteredUsers = selectedProf
    ? allUsers.filter((item) => item.profession.name === selectedProf.name)
    : allUsers
  const count = filteredUsers.length

  useEffect(() => {
    setCount(count)
  }, [filteredUsers])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const pageChangehandle = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const users = paginate(filteredUsers, currentPage, pageSize)
  return (
    <div className="d-flex flex-column ">
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
      <div className="d-flex align-items-center justify-content-center">
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={pageChangehandle}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}
Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedProf: PropTypes.object,
  setCount: PropTypes.func
}
export default Users
