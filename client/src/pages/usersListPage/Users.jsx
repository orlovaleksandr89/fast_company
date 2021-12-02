import React, { useState, useEffect } from 'react'
import Pagination from '../../components/common/Pagination'
import { paginate } from '../../utilits/paginate'
import PropTypes from 'prop-types'
import UsersTable from '../../components/ui/usersTable'
import SearchStatus from '../../components/ui/searchStatus'
import GroupList from '../../components/common/groupList'
import _ from 'lodash'
import SearchBar from '../../components/SearchBar'
import { useUsers } from '../../hooks/useUsers'
import { useProfessions } from '../../hooks/useProfession'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  const [selectedProf, setSelectedProf] = useState()

  const [searchValue, setSearchValue] = useState('')

  const getSearchValueHandler = () => {
    setSelectedProf()
    setSearchValue(event.target.value)
  }
  const { users } = useUsers()
  const { professions } = useProfessions()

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

  const deleteUserHandler = (id) => {
    // const filtered = users.filter((user) => user._id !== id)
    // setUsers(filtered)
    console.log(id)
  }

  const pageSize = 3

  let filteredUsers = users

  if (selectedProf) {
    filteredUsers = users.filter((user) => user.profession === selectedProf._id)
  } else if (searchValue) {
    filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
  const userLength = sortedUsers.length

  const cporUsers = paginate(sortedUsers, currentPage, pageSize)

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
              deleteUserHandler={deleteUserHandler}
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
