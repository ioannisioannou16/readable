import uuidv4 from 'uuid/v4'
import * as types from './actionTypes'
import api from '../utils/api'

export const fetchPosts = (category) => {
  const endpoint = category ? `${category}/posts` : 'posts'
  return {
    type: types.FETCH_POSTS,
    payload: api('get', endpoint)
  }
}

export const fetchPost = (id) => {
  return {
    type: types.FETCH_POST,
    payload: api('get', `posts/${id}`)
  }
}

export const createPost = (post) => {
  const postWithAllDetails = {
    ...post,
    id: uuidv4(),
    timestamp: Date.now()
  }
  return {
    type: types.CREATE_POST,
    payload: api('post', 'posts', postWithAllDetails)
  }
}

export const editPost = (id, title, body) => {
  const timestamp = Date.now()
  return {
    type: types.EDIT_POST,
    payload: api('put', `posts/${id}`, { id, title, body, timestamp })
  }
}

export const deletePost = (id) => {
  return {
    type: types.DELETE_POST,
    payload: api('delete', `posts/${id}`)
  }
}

export const votePost = (id, option) => {
  return {
    type: types.VOTE_POST,
    payload: api('post', `posts/${id}`, { option })
  }
}

export const sort = (options) => {
  return {
    type: types.SORT,
    payload: options
  }
}