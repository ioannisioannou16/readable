import * as types from './actionTypes'

export const openModal = (name, values) => {
  return {
    type: types.OPEN_MODAL,
    payload: {
      name,
      values
    }
  }
}

export const closeModal = (name) => {
  return {
    type: types.CLOSE_MODAL,
    payload: { name }
  }
}