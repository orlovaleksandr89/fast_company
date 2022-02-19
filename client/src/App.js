import React from 'react'
import UsersPage from './pages/users'
import NavBar from './components/NavBar'
import Login from './pages/login'
import Main from './pages/main'
import { ToastContainer } from 'react-toastify'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  MAIN_ROUTE,
  USERS_ROUTE
} from './utilits/constants'

import 'react-toastify/dist/ReactToastify.css'

import ProtectedRoute from './components/ProtectedRoute'
import LogOut from './pages/LogOut'

import AppLoader from './components/ui/HOC/appLoader'

const App = () => {
  return (
    <AppLoader>
      <NavBar />
      <div className="col-md-12">
        <Switch>
          <ProtectedRoute
            path={USERS_ROUTE + '/:id?/:edit?'}
            component={UsersPage}
          />

          <Route path={LOGIN_ROUTE + '/:type?'} component={Login} />
          <Route path={LOGOUT_ROUTE} component={LogOut} />
          <Route path={MAIN_ROUTE} exact component={Main} />
          <Redirect to={MAIN_ROUTE} />
        </Switch>
      </div>

      <ToastContainer />
    </AppLoader>
  )
}

export default App
