import * as types from './actionTypes'
import api from '../utils/api'

export const fetchCategories = () => {
  return {
    type: types.FETCH_CATEGORIES,
    payload: api('get', 'categories')
  }
}