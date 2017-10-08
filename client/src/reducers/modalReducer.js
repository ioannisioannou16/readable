import * as types from '../actions/actionTypes'

const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case types.OPEN_MODAL: {
      const { name, values } = action.payload
      return {
        ...state,
        [name]: {
          isOpen: true,
          ...values
        }
      }
    }
    case types.CLOSE_MODAL:
      return {
        ...state,
        [action.payload.name]: {
          isOpen: false
        }
      }
    default:
      return state
  }
}

export default modalReducer