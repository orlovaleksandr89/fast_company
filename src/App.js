import React from 'react'
import UsersPage from './pages/users'
import NavBar from './components/NavBar'
import Login from './pages/login'
import Main from './pages/main'
import NewUser from './pages/NewUser'
import NewUserForm from './components/new_user/NewUserForm'

import { Switch, Route } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NEW_USER_EDIT_ROUTE,
  NEW_USER_ROUTE,
  USERS_ROUTE
} from './utilits/constants'
import SingleUserPage from './pages/usersPage'
import EditPage from './pages/editPage'

const App = () => {
  return (
    <>
      <NavBar />
      <div className="col-md-12">
        <Switch>
          <Route path={USERS_ROUTE} exact component={UsersPage} />
          <Route
            path={USERS_ROUTE + '/:id?'}
            exact
            component={SingleUserPage}
          />
          <Route
            path={USERS_ROUTE + '/:id/:edit?'}
            exact
            component={EditPage}
          />
          <Route path={LOGIN_ROUTE + '/:type?'} component={Login} />
          <Route path={NEW_USER_EDIT_ROUTE} exact component={NewUserForm} />
          <Route path={NEW_USER_ROUTE} exact component={NewUser} />
          <Route path={MAIN_ROUTE} exact component={Main} />
        </Switch>
      </div>
    </>
  )
}

export default App
