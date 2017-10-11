import { applyMiddleware, createStore } from 'redux'
import reducer from '../reducers'
import promiseMiddleware from '../middleware/promiseMiddleware'

export default createStore(reducer, applyMiddleware(promiseMiddleware))