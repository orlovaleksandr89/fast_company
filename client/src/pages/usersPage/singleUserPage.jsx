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

  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(id).then((user) => {
      setUser(user)
      return user
    })
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container p-4">
      <div className="row gutters-sm">
        {userById.name && (
          <div className="col-md-4 mb-3">
            <UserInfoCard {...userById} />
            <QualityCard {...userById} />
            <MeetingsCard {...userById} />
          </div>
        )}

        <div className="col-md-8 ">
          <CommentSection />
        </div>
      </div>
    </div>
  )
}

export default SingleUserPage
