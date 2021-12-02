import React from 'react'
import { useParams } from 'react-router-dom'
import UserProvider from '../hooks/useUsers'
import Users from '../pages/usersListPage'
import SingleUserPage from './usersPage'

const UsersPage = () => {
  const { id } = useParams()

  return (
    <UserProvider>
      <div>{id ? <SingleUserPage /> : <Users />}</div>
    </UserProvider>
  )
}

export default UsersPage
