import React from 'react'
import { useUsers } from '../../hooks/useUsers'
import CommentSection from '../../components/user/CommenSection'
import MeetingsCard from '../../components/user/MeetingsCard'
import QualityCard from '../../components/user/QualityCard'
import UserInfoCard from '../../components/user/UserInfoCard'
import { useParams } from 'react-router-dom'
import { CommentsProvider } from '../../hooks/useComments'

const SingleUserPage = () => {
  const { id } = useParams()

  const { getUserById } = useUsers()
  const userById = getUserById(id)
  console.log(userById)

  return (
    <div className="container p-4">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserInfoCard {...userById} />
          <QualityCard qualities={userById.qualities} />
          <MeetingsCard {...userById} />
        </div>

        <div className="col-md-8 ">
          <CommentsProvider>
            <CommentSection />
          </CommentsProvider>
        </div>
      </div>
    </div>
  )
}

export default SingleUserPage
