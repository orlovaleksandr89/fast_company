import React from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
// import { useUsers } from '../../hooks/useUsers'
// import Loader from '../../components/ui/loader'
import CommentSection from '../../components/user/CommenSection'
import MeetingsCard from '../../components/user/MeetingsCard'
import QualityCard from '../../components/user/QualityCard'
import UserInfoCard from '../../components/user/UserInfoCard'

const SingleUserPage = () => {
  const { id } = useParams()
  const { getUserById } = useUsers()
  const userById = getUserById(id)
  console.log(id, userById)

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
