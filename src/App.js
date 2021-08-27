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
    const selectedUser = users.find((user) => user._id === id)
    selectedUser.status
      ? delete selectedUser.status
      : (selectedUser.status = 'saved')
    setUsers([...users])
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
