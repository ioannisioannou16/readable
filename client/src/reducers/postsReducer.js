import * as types from '../actions/actionTypes'
import { castArray, get, head, keyBy, merge, omit, orderBy, union, without } from 'lodash'

const initialState = {
  byId: {},
  allIds: [],
  sort: null
}

const postsReducer = (state = initialState, action) => {
  if (action.error) {
    return state
  }
  switch (action.type) {
    case types.FETCH_POSTS:
    case types.FETCH_POST:
    case types.CREATE_POST:
    case types.EDIT_POST:
    case types.VOTE_POST: {
      const posts = castArray(action.payload)
      const definedPosts = posts.filter(x => x.id)
      const postsById = keyBy(definedPosts, 'id')
      const allPostsById = merge({}, state.byId, postsById)
      const allIds = state.allIds.length !== Object.keys(allPostsById).length
        ? union(Object.keys(postsById), state.allIds)
        : state.allIds
      return {
        ...state,
        byId: allPostsById,
        allIds
      }
    }
    case types.DELETE_POST: {
      const postId = action.payload.id
      return {
        ...state,
        byId: omit(state.byId, postId),
        allIds: state.allIds.filter(id => id !== postId)
      }
    }
    case types.FETCH_COMMENTS:
    case types.CREATE_COMMENT: {
      const comments = castArray(action.payload)
      const parentId = get(head(comments), 'parentId')
      const parentPost = get(state.byId, parentId)
      if (parentId && parentPost) {
        const commentIds = comments.map(x => x.id)
        return {
          ...state,
          byId: {
            ...state.byId,
            [parentId]: {
              ...parentPost,
              comments: union(parentPost.comments, commentIds)
            }
          }
        }
      }
      return state
    }
    case types.DELETE_COMMENT: {
      const comment = action.payload
      const parentId = comment.parentId
      const parentPost = get(state.byId, parentId)
      if (parentId && parentPost) {
        const filteredParentComments = without(parentPost.comments, comment.id)
        return {
          ...state,
          byId: {
            ...state.byId,
            [parentId]: {
              ...parentPost,
              comments: filteredParentComments
            }
          }
        }
      }
      return state
    }
    case types.SORT: {
      const {field, method} = action.payload
      return {
        ...state,
        allIds: orderBy(state.allIds.map(x => state.byId[x]), field, method).map(x => x.id),
        sort: action.payload
      }
    }
    default:
      return state
  }
}

export default postsReducer