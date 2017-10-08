import * as types from '../actions/actionTypes'

const categoriesReducer = (state = [], action) => {
  if (action.error) {
    return state
  }
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return action.payload.categories.map(x => x.name)
    default:
      return state
  }
}

export default categoriesReducer