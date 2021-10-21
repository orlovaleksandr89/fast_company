import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../API'
import Loader from '../../components/ui/loader'
import CommentSection from '../../components/user/CommenSection'
import MeetingsCard from '../../components/user/MeetingsCard'
import QualityCard from '../../components/user/QualityCard'
import UserInfoCard from '../../components/user/UserInfoCard'

const SingleUserPage = () => {
  const [loading, setIsLoading] = useState(false)
  const [userById, setUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [, setComments] = useState([])
  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(id).then((user) => {
      setUser(user)
      return user
    })

    api.users.fetchAll().then((data) => setAllUsers(data))
    api.comments
      .fetchAll()
      .then((data) => setComments(data))
      .then(() => setIsLoading(false))
  }, [])
  if (loading) {
    return <Loader />
  }

  return (
    <div className="container p-4">
      {userById.name && (
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserInfoCard {...userById} />
            <QualityCard {...userById} />
            <MeetingsCard {...userById} />
          </div>
          <div className="col-md-8 ">
            <CommentSection {...allUsers} id={id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleUserPage
