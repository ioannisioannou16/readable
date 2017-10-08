import uuidv4 from 'uuid/v4'
import * as types from './actionTypes'
import api from '../utils/api'

export const fetchComments = (id) => {
  return {
    type: types.FETCH_COMMENTS,
    payload: api('get', `posts/${id}/comments`)
  }
}

export const createComment = (comment, parentId) => {
  const commentWithAllDetails = {
    ...comment,
    id: uuidv4(),
    timestamp: Date.now(),
    parentId
  }
  return {
    type: types.CREATE_COMMENT,
    payload: api('post', 'comments', commentWithAllDetails)
  }
}

export const editComment = (id, body) => {
  const timestamp = Date.now()
  return {
    type: types.EDIT_COMMENT,
    payload: api('put', `comments/${id}`, { body, timestamp })
  }
}

export const deleteComment = (id) => {
  return {
    type: types.DELETE_COMMENT,
    payload: api('delete', `comments/${id}`)
  }
}

export const voteComment = (id, option) => {
  return {
    type: types.VOTE_COMMENT,
    payload: api('post', `comments/${id}`, { option })
  }
}