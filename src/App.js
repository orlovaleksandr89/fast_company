import React from 'react'
import UsersPage from './pages/users'
import NavBar from './components/NavBar'
import Login from './pages/login'
import Main from './pages/main'

import { Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="container fluid main_container">
      <NavBar />
      <div className="col-md-12">
        <Switch>
          <Route path="/users/:id?" component={UsersPage} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Main} />
        </Switch>
      </div>
    </div>
  )
}

export default App
