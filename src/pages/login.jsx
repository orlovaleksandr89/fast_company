import React, { useState } from 'react'

import LoginForm from '../components/ui/form/LoginForm'
import { useParams } from 'react-router'
import RegisterForm from '../components/ui/form/RegisterForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const toggleFormType = () => {
    setFormType((prev) => (prev === 'register' ? 'login' : 'register'))
  }

  return (
    <div className="container mt-4">
      <div className="row ">
        <div className="col-md-6  offset-md-3 shadow p-4">
          {formType === 'register' && (
            <>
              <RegisterForm />
              <p>
                Registered?{' '}
                <a role="button" className="fw-bold" onClick={toggleFormType}>
                  Sign in
                </a>
              </p>
            </>
          )}

          {formType !== 'register' && (
            <>
              <LoginForm />
              <p>
                Dont have an account?{' '}
                <a role="button" className="fw-bold" onClick={toggleFormType}>
                  Sign up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
