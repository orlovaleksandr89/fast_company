import React from 'react'
import { useParams } from 'react-router-dom'
import UserProvider from '../hooks/useUsers'
import Users from '../pages/usersListPage'
import SingleUserPage from './usersPage'

const UsersPage = () => {
  const { id } = useParams()

  return (
    <div>
      <UserProvider>{id ? <SingleUserPage /> : <Users />}</UserProvider>
    </div>
  )
}

export default UsersPage
