import React from 'react'
import UserImage from '../ui/UserImage'
import PropTypes from 'prop-types'
import { USERS_ROUTE } from '../../utilits/constants'
import { Link } from 'react-router-dom'

function UserInfoCard(userById) {
  const { name, rate, profession, _id, image } = userById
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          to={{ pathname: USERS_ROUTE + '/' + _id + '/edit', state: userById }}
        >
          <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
            <i className="bi bi-gear"></i>
          </button>
        </Link>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <UserImage image={image} />
          <div className="mt-3">
            <h4>{name}</h4>
            <p className="text-secondary mb-1">{profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
UserInfoCard.propTypes = {
  userById: PropTypes.object
}
export default UserInfoCard
