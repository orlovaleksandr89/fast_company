import React from 'react'
import UsersPage from './pages/users'
import NavBar from './components/NavBar'
import Login from './pages/login'
import Main from './pages/main'
import NewUser from './pages/NewUser'
import NewUserForm from './components/new_user/NewUserForm'

import { Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <NavBar />
      <div className="col-md-12">
        <Switch>
          <Route path="/users/:id?" component={UsersPage} />
          <Route path="/login" component={Login} />
          <Route path="/new_user" exact component={NewUser} />
          <Route path="/new_user/edit" component={NewUserForm} />
          <Route path="/" exact component={Main} />
        </Switch>
      </div>
    </>
  )
}

export default App
