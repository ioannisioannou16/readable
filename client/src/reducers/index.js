import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { loadingBarReducer } from 'react-redux-loading-bar'
import commentsReducer from './commentsReducer'
import postsReducer from './postsReducer'
import categoriesReducer from './categoriesReducer'
import modalReducer from './modalReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  form: formReducer,
  loadingBar: loadingBarReducer,
  posts: postsReducer,
  comments: commentsReducer,
  categories: categoriesReducer,
  modal: modalReducer,
  error: errorReducer
})
