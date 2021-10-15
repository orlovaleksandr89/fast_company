import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function NewUserCard() {
  const [user, setUser] = useState({})

  const userIsPresent = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    setUser(userIsPresent)
    return () => setUser(null)
  }, [])

  return (
    <div className="container shadow p-4">
      <div className="row">
        <h1>Карточка студента</h1>
      </div>
      {userIsPresent &&
        Object.keys(user).map((fieldName) => {
          return (
            <div key={fieldName} className="row">
              <div className="col-md-2 fw-bold">
                <p>{fieldName}:</p>
              </div>
              <div className="col-md-2">
                <span>{user[fieldName]}</span>
              </div>
            </div>
          )
        })}
      {!userIsPresent && <p>Пока что пусто</p>}

      <Link to={{ pathname: '/new_user/edit', state: user }}>
        <button className="btn btn-primary btn-sm ">
          {!userIsPresent ? 'Добавить' : 'Изменить'}
        </button>
      </Link>
    </div>
  )
}

export default NewUserCard
