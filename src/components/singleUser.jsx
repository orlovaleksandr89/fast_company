import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../API'
import Loader from '../components/loader'
import Quality from './quality'

const SingleUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userById, setUser] = useState({})
  const { id } = useParams()
  const history = useHistory()

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
  console.log(isLoading, userById)
  if (!userById.name) {
    return <Loader />
  }

  return (
    <div className="container">
      <h1>{`Имя : ${userById.name}`}</h1>
      <h2>{`Профессия : ${userById.profession.name}`}</h2>

      {userById.qualities.map((quality, i) => (
        <Quality key={i} {...quality} />
      ))}
      <h4>{`completedMeetings: ${userById.completedMeetings}`}</h4>

      <button
        className="btn btn-warning"
        onClick={() => {
          history.goBack()
        }}
      >
        Вернутся назад
      </button>
    </div>
  )
}

export default SingleUser
