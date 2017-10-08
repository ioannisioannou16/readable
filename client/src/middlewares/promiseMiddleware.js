import { get, isFunction } from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const promiseMiddleware = ({ dispatch }) => {

  return next => action => {

    if (!get(action, 'type') || !isFunction(get(action, 'payload.then'))) {
      return next(action)
    }

    const { type, payload } = action

    dispatch(showLoading())

    return payload.then(
      response => {
        dispatch(hideLoading())
        return dispatch({ type, payload: response })
      },
      error => {
        dispatch(hideLoading())
        dispatch({ type, payload: error, error: true })
        throw error
      }
    )
  }
}

export default promiseMiddleware