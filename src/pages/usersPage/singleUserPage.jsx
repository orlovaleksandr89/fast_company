import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../API'
import Loader from '../../components/ui/loader'
import Quality from '../../components/ui/qualities/quality'
import { USERS_ROUTE } from '../../utilits/constants'

const SingleUserPage = () => {
  const [, setIsLoading] = useState(false)
  const [userById, setUser] = useState({})
  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    api.users
      .getById(id)
      .then((user) => {
        setUser(user)
        return user
      })
      .then(() => setIsLoading(false))
  }, [])
  if (!userById.name) {
    return <Loader />
  }

  return (
    <div className="container shadow p-3 mt-3">
      <h1>{`Имя : ${userById.name}`}</h1>
      <h2>{`Профессия : ${userById.profession.name}`}</h2>

      {userById.qualities.map((quality, i) => (
        <Quality key={i} {...quality} />
      ))}
      <h4>{`completedMeetings: ${userById.completedMeetings}`}</h4>
      <Link
        to={{ pathname: USERS_ROUTE + '/' + id + '/edit', state: userById }}
      >
        <button className="btn btn-secondary btn-sm mt-3">Редактировать</button>
      </Link>
    </div>
  )
}

export default SingleUserPage
