import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import { Router } from 'react-router-dom'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'

import history from './utilits/history'

const store = createStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
