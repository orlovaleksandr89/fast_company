import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import { paginate } from '../utilits/paginate'
import PropTypes from 'prop-types'
import UsersTable from './usersTable'
import SearchStatus from './searchStatus'
import GroupList from './groupList'
import _ from 'lodash'
import api from '../API'
import Loader from './loader'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const [selectedProf, setSelectedProf] = useState()
  const [users, setUsers] = useState([])
  const [professions, setProfessions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    api.users.fetchAll().then((users) => {
      setUsers(users)
      setIsLoading(false)
      return users
    })

    api.professions.fetchAll().then((data) => {
      setProfessions(data)
      setIsLoading(false)
    })
    return () => {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const resetProfessionsHandler = () => {
    setSelectedProf()
  }
  const professionSelectHandle = (item) => {
    setSelectedProf(item)
  }
  const pageChangehandle = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const toggleBookMarkHanble = (id) => {
    const newUsers = [...users]
    newUsers.filter((user) => {
      if (user._id === id) {
        user.status = !user.status
        return user
      }
      return user
    })
    setUsers(newUsers)
  }

  const deleteUserHandler = (id) => {
    const filtered = users.filter((user) => user._id !== id)
    setUsers(filtered)
  }

  const pageSize = 3

  let filteredUsers

  if (selectedProf) {
    filteredUsers = users.filter(
      (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
    )
  } else {
    filteredUsers = users
  }

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
  const userLength = sortedUsers.length

  const cporUsers = paginate(sortedUsers, currentPage, pageSize)

  if (isLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    )
  }
  return (
    <div className="container">
      <div className="row">
        <SearchStatus userLength={userLength} />
        <div className="col-md-2">
          {professions && (
            <GroupList
              professions={professions}
              onItemSelect={professionSelectHandle}
              selectedProf={selectedProf}
              resetProfessionsHandler={resetProfessionsHandler}
            />
          )}
        </div>
        <div className="col-md-10">
          <div className="d-flex flex-column ">
            <UsersTable
              users={cporUsers}
              setSortBy={setSortBy}
              currentSort={sortBy}
              deleteUserHandler={deleteUserHandler}
              toggleBookMarkHanble={toggleBookMarkHanble}
            />
            <div className="d-flex align-items-center justify-content-center">
              <Pagination
                itemsCount={userLength}
                pageSize={pageSize}
                onPageChange={pageChangehandle}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedProf: PropTypes.object,
  setCount: PropTypes.func,
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  professionSelectHandle: PropTypes.func,
  resetProfessionsHandler: PropTypes.func
}
export default Users
