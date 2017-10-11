import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import { applyMiddleware, createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import promiseMiddleware from './middlewares/promiseMiddleware'

const store = createStore(reducer, applyMiddleware(promiseMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
