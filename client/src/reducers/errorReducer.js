import * as types from '../actions/actionTypes'
import get from 'lodash/get'

const errorReducer = (state = null, action) => {
  const { type, error, payload } = action
  const message = get(payload, 'message')
  if (type === types.DISMISS_ERROR) {
    return null
  } else if (error && types[type]) {
    return message || "Unknown error"
  }
  return state
}

export default errorReducer