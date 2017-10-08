import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchComments } from '../actions/commentActions'
import { fetchPosts, sort } from '../actions/postActions'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'
import Loading from './Loading'
import PropTypes from 'prop-types'

class PostList extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount() {
    this.makeRequest(this.props.selectedCategory)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedCategory !== newProps.selectedCategory) {
      this.makeRequest(newProps.selectedCategory)
    }
  }

  makeRequest = (selectedCategory) => {
    const { fetchPosts, sort, fetchComments, location } = this.props
    this.setState({ isLoading: true })
    fetchPosts(selectedCategory)
      .then(res => res.payload.forEach(post => fetchComments(post.id)))
      .then(() => {
        if(get(location, 'state.from.pathname') !== '/create') {
          sort({
            field: 'voteScore',
            method: 'desc',
            description: 'Highest Score'
          })
        }
      })
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState( { isLoading: false }))
  }

  render() {
    const { postIds } = this.props
    if (this.state.isLoading && !postIds.length) {
      return <Loading/>
    } else if (!postIds.length) {
      return <div className="centered">No posts</div>
    } else {
      return (
        <div>
          {postIds.map(postId => <Post key={postId} id={postId}/>)}
        </div>
      )
    }
  }
}

PostList.propTypes = {
  selectedCategory: PropTypes.string,
  fetchPosts: PropTypes.func,
  sort: PropTypes.func,
  fetchComments: PropTypes.func,
  location: PropTypes.object,
  postIds: PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProps = (state, ownProps) => {
  const { posts: { byId, allIds } } = state
  const { selectedCategory } = ownProps
  return {
    postIds: selectedCategory
      ? allIds.filter(id => byId[id].category === selectedCategory)
      : allIds
  }
}

export default withRouter(connect(mapStateToProps, { fetchPosts, sort, fetchComments })(PostList))
