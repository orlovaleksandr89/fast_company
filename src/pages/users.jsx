import React from 'react'
import Users from '../components/Users'
import { useParams } from 'react-router-dom'
import SingleUser from '../components/singleUser'

const UsersPage = () => {
  const { id } = useParams()

  return <div>{id ? <SingleUser /> : <Users />}</div>
}

export default UsersPage
