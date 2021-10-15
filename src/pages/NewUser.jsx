import React from 'react'
import NewUserCard from '../components/new_user/NewUserCard'

function NewUser() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
          <NewUserCard />
        </div>
      </div>
    </div>
  )
}

export default NewUser
