import React, { useState, useEffect } from 'react'
import api from './API'
import Users from './components/Users'
import SearchStatus from './components/searchStatus'
import GroupList from './components/groupList'
import Loader from './components/loader'

const App = () => {
  const [users, setUsers] = useState()
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const deleteUserHandler = (id) => {
    const filtered = users.filter((user) => user._id !== id)
    setUsers(filtered)
  }
  useEffect(() => {
    setIsLoading(true)
    api.users
      .fetchAll()
      .then((users) => {
        setUsers(users)
        return users
      })
      .then((users) => {
        setCount(users.length)
        setIsLoading(false)
      })

    api.professions.fetchAll().then((data) => {
      setProfessions(data)
      setIsLoading(false)
    })
    return () => {
      setIsLoading(false)
    }
  }, [])

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
  const professionSelectHandle = (item) => {
    setSelectedProf(item)
  }
  const resetProfessionsHandler = () => {
    setSelectedProf()
  }
  if (isLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container">
      {users && <SearchStatus userLength={count} />}

      <div className="row">
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
          {users && (
            <Users
              users={users}
              onDelete={deleteUserHandler}
              toggleBookMarkHanble={toggleBookMarkHanble}
              selectedProf={selectedProf}
              setCount={(value) => setCount(value)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
