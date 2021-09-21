import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import { paginate } from '../utilits/paginate'
import PropTypes from 'prop-types'
import UsersTable from './usersTable'
import _ from 'lodash'

const Users = ({ users: allUsers, selectedProf, setCount, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })

  const pageSize = 4
  let filteredUsers

  if (selectedProf) {
    filteredUsers = allUsers.filter(
      (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
    )
  } else {
    filteredUsers = allUsers
  }

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

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])

  const users = paginate(sortedUsers, currentPage, pageSize)
  return (
    <div className="d-flex flex-column ">
      <UsersTable
        users={users}
        {...rest}
        setSortBy={setSortBy}
        currentSort={sortBy}
      />
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
