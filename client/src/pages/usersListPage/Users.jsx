import React, { useState, useEffect } from 'react'
import Pagination from '../../components/common/Pagination'
import { paginate } from '../../utilits/paginate'
import PropTypes from 'prop-types'
import UsersTable from '../../components/ui/usersTable'
import SearchStatus from '../../components/ui/searchStatus'
import GroupList from '../../components/common/groupList'
import _ from 'lodash'
import SearchBar from '../../components/SearchBar'

import Loader from '../../components/ui/loader'
import { useSelector } from 'react-redux'
import {
  getProfessionsList,
  getProfessionsLoadingStatus
} from '../../store/professions'
import { getCurrentUserId, getUsersList } from '../../store/users'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const [selectedProf, setSelectedProf] = useState()
  const [searchValue, setSearchValue] = useState('')

  const getSearchValueHandler = (event) => {
    setSelectedProf()
    setSearchValue(event.target.value)
  }

  const users = useSelector(getUsersList())
  const currentUserId = useSelector(getCurrentUserId())

  const professions = useSelector(getProfessionsList())
  const profLoading = useSelector(getProfessionsLoadingStatus())

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const resetProfessionsHandler = () => {
    setSearchValue('')
    setSelectedProf()
  }
  const professionSelectHandle = (item) => {
    setSearchValue('')
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
  }

  const pageSize = 3
  const filterUsers = (data) => {
    let filteredUsers = data

    if (selectedProf) {
      filteredUsers = data.filter(
        (user) => user.profession === selectedProf._id
      )
    } else if (searchValue) {
      filteredUsers = data.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    }
    return filteredUsers.filter((user) => user._id !== currentUserId)
  }

  const filteredUsers = filterUsers(users)

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
  const userLength = sortedUsers.length

  const cporUsers = paginate(sortedUsers, currentPage, pageSize)

  if (profLoading) {
    return <Loader />
  }

  return (
    <div className="container shadow mt-4">
      <div className="row mb-4">
        <SearchStatus userLength={userLength} />
        <div className="col-md-2 mb-3">
          {
            <GroupList
              professions={professions}
              onItemSelect={professionSelectHandle}
              selectedProf={selectedProf}
              resetProfessionsHandler={resetProfessionsHandler}
            />
          }
        </div>
        <div className="col-md-10">
          <SearchBar
            searchValue={searchValue}
            getSearchValueHandler={getSearchValueHandler}
          />
          <div>
            <UsersTable
              users={cporUsers}
              setSortBy={setSortBy}
              currentSort={sortBy}
              toggleBookMarkHanble={toggleBookMarkHanble}
            />
            <div className="mb-3">
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
