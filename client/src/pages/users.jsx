import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import UserProvider from '../hooks/useUsers'
import Users from '../pages/usersListPage'
import { USERS_ROUTE } from '../utilits/constants'
import EditPage from './editPage/EditPage'
import SingleUserPage from './usersPage'

const UsersPage = () => {
  const { id, edit } = useParams()
  const { currentUser } = useAuth()

  return (
    <UserProvider>
      <div>
        {id ? (
          edit ? (
            id === currentUser._id ? (
              <EditPage />
            ) : (
              <Redirect to={`${USERS_ROUTE}/${currentUser._id}/edit`} />
            )
          ) : (
            <SingleUserPage userId={id} />
          )
        ) : (
          <Users />
        )}
      </div>
    </UserProvider>
  )
}

export default UsersPage
