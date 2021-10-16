import React from 'react'
import { useParams } from 'react-router-dom'
import Users from '../pages/usersListPage'
import SingleUserPage from './usersPage'

const UsersPage = () => {
  const { id } = useParams()

  return <div>{id ? <SingleUserPage /> : <Users />}</div>
}

export default UsersPage
