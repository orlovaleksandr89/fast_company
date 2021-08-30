import React, { useState } from 'react'
import api from './API'
import Users from './components/Users'
import SearchStatus from './components/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const deleteUserHandler = (id) => {
    const filtered = users.filter((user) => user._id !== id)
    setUsers(filtered)
  }

  const toggleBookMarkHanble = (id) => {
    setUsers(
      users.filter((user) => {
        if (user._id === id) {
          user.status = !user.status
          return user
        }
        return user
      })
    )
  }

  return (
    <div>
      <SearchStatus users={users} />
      <Users
        users={users}
        onDelete={deleteUserHandler}
        toggleBookMarkHanble={toggleBookMarkHanble}
      />
    </div>
  )
}

export default App
