import * as types from '../actions/actionTypes'
import castArray from 'lodash/castArray'
import keyBy from 'lodash/keyBy'
import omit from 'lodash/omit'

const commentsReducer = (state = {}, action) => {
  if (action.error) {
    return state
  }
  switch (action.type) {
    case types.FETCH_COMMENTS:
    case types.CREATE_COMMENT:
    case types.EDIT_COMMENT:
    case types.VOTE_COMMENT:
      return {
        ...state,
        ...keyBy(castArray(action.payload), 'id')
      }
    case types.DELETE_COMMENT:
      return omit(state, action.payload.id)
    default:
      return state
  }
}

export default commentsReducer
