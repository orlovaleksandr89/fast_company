import React from 'react'

import CommentSection from '../../components/user/CommenSection'
import MeetingsCard from '../../components/user/MeetingsCard'
import QualityCard from '../../components/user/QualityCard'
import UserInfoCard from '../../components/user/UserInfoCard'

import PropTypes from 'prop-types'
import Loader from '../../components/ui/loader'
import { useSelector } from 'react-redux'
import { getUserById } from '../../store/users'

const SingleUserPage = ({ userId }) => {
  const userById = useSelector(getUserById(userId))

  if (!userById) {
    return <Loader />
  }

  return (
    <div className="container p-4">
      {userById && (
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserInfoCard {...userById} />
            {userById.qualities && (
              <QualityCard qualities={userById.qualities} />
            )}
            <MeetingsCard {...userById} />
          </div>

          <div className="col-md-8 ">
            <CommentSection userId={userById._id} />
          </div>
        </div>
      )}
    </div>
  )
}
SingleUserPage.propTypes = {
  userId: PropTypes.string
}

export default SingleUserPage
