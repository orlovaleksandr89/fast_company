import React from 'react'
import UsersPage from './pages/users'
import NavBar from './components/NavBar'
import Login from './pages/login'
import Main from './pages/main'
import { ToastContainer } from 'react-toastify'
import { Switch, Route } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, USERS_ROUTE } from './utilits/constants'
import SingleUserPage from './pages/usersPage'
import EditPage from './pages/editPage'
import ProfessionProvider from './hooks/useProfession'
import QualityProvider from './hooks/useQualities'

const App = () => {
  return (
    <>
      <NavBar />
      <div className="col-md-12">
        <Switch>
          <ProfessionProvider>
            <QualityProvider>
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
            </QualityProvider>
          </ProfessionProvider>

          <Route path={MAIN_ROUTE} exact component={Main} />
        </Switch>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
