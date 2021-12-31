import React from 'react'
import UsersPage from './pages/users'
import NavBar from './components/NavBar'
import Login from './pages/login'
import Main from './pages/main'
import { ToastContainer } from 'react-toastify'
import { Route, Switch } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  MAIN_ROUTE,
  USERS_ROUTE
} from './utilits/constants'
import SingleUserPage from './pages/usersPage'
import EditPage from './pages/editPage'
import ProfessionProvider from './hooks/useProfession'
import QualityProvider from './hooks/useQualities'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './hooks/useAuth'
import UserProvider from './hooks/useUsers'
import ProtectedRoute from './components/ProtectedRoute'
import LogOut from './pages/LogOut'

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div className="col-md-12">
          <ProfessionProvider>
            <QualityProvider>
              <UserProvider>
                <Switch>
                  <ProtectedRoute
                    path={USERS_ROUTE}
                    exact
                    component={UsersPage}
                  />
                  <ProtectedRoute
                    path={USERS_ROUTE + '/:id?'}
                    exact
                    component={SingleUserPage}
                  />
                  <ProtectedRoute
                    path={USERS_ROUTE + '/:id/:edit?'}
                    exact
                    component={EditPage}
                  />
                  <Route path={LOGIN_ROUTE + '/:type?'} component={Login} />
                  <Route path={LOGOUT_ROUTE} component={LogOut} />
                  <Route path={MAIN_ROUTE} exact component={Main} />
                </Switch>
              </UserProvider>
            </QualityProvider>
          </ProfessionProvider>
        </div>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
