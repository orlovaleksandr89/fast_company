import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NEW_USER_EDIT_ROUTE } from '../../utilits/constants'
import { renderYears } from '../../utilits/helpers'

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
        <h1>Карточка пользователя</h1>
      </div>
      {userIsPresent &&
        Object.keys(user).map((fieldName) => {
          return (
            <div key={fieldName} className="row mt-3">
              <div className="col-md-2 fw-bold">
                <p>{fieldName}</p>
              </div>
              <div className="col-md-4">
                <span>
                  {fieldName === 'dateofbirth'
                    ? user[fieldName] + ' ' + renderYears(user.dateofbirth)
                    : user[fieldName]}
                </span>
              </div>
            </div>
          )
        })}
      {!userIsPresent && <p>Пока что пусто</p>}

      <Link to={{ pathname: NEW_USER_EDIT_ROUTE, state: user }}>
        <button className="btn btn-primary btn-sm ">
          {!userIsPresent ? 'Добавить' : 'Изменить'}
        </button>
      </Link>
    </div>
  )
}

export default NewUserCard
