import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import UsersLoader from '../components/ui/HOC/usersLoader'
import Users from '../pages/usersListPage'
import { getCurrentUserId } from '../store/users'
import { USERS_ROUTE } from '../utilits/constants'
import EditPage from './editPage/EditPage'
import SingleUserPage from './usersPage'

const UsersPage = () => {
  const { id, edit } = useParams()

  const currentUserId = useSelector(getCurrentUserId())

  return (
    <UsersLoader>
      {id ? (
        edit ? (
          id === currentUserId ? (
            <EditPage />
          ) : (
            <Redirect to={`${USERS_ROUTE}/${currentUserId}/edit`} />
          )
        ) : (
          <SingleUserPage userId={id} />
        )
      ) : (
        <Users />
      )}
    </UsersLoader>
  )
}

export default UsersPage
