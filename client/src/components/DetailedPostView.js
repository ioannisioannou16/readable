import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../actions/commentActions'
import { deletePost, fetchPost, votePost } from '../actions/postActions'
import { get } from 'lodash'
import CommentCreate from './CreateComment'
import CommentList from './CommentList'
import Vote from './Vote'
import { Col, Row } from 'reactstrap'
import OptionsDropdown from './OptionsDropdown'
import { openModal } from '../actions/modalActions'
import Loading from './Loading'
import toLocalTime from '../utils/dateFormatter'
import PropTypes from 'prop-types'

class DetailedPostView extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount() {
    const { fetchPost, fetchComments } = this.props
    const { id } = this.props.match.params
    this.setState({ isLoading: true })
    Promise.all([fetchPost(id), fetchComments(id)])
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState( { isLoading: false }))
  }

  onVote = (option) => () => {
    this.props.votePost(this.props.id, option)
  }

  onEdit = () => {
    const { id, title, body, openPostModal } = this.props
    openPostModal({id, title, body})
  }

  onDelete = () => {
    this.props.deletePost(this.props.id)
      .then(() => this.props.history.push('/'))
  }

  render() {
    const { id } = this.props
    if (this.state.isLoading && !id) {
      return <Loading/>
    } else if (!id) {
      return <div className="centered">Post does not exist</div>
    } else {
      const {title, author, timestamp, body, voteScore, comments} = this.props
      const localTime = toLocalTime(timestamp)
      return (
        <div>
          <h1>{title}</h1>
          <p className="lead mb-2">by <em>{author}</em> on {localTime}</p>
          <Row>
            <Col><Vote voteScore={voteScore} onVote={this.onVote}/></Col>
            <Col className="text-right">
              <OptionsDropdown onEdit={this.onEdit} onDelete={this.onDelete}/>
            </Col>
          </Row>
          <hr/>
          <p>{body}</p>
          <hr/>
          <CommentList commentIds={comments || []}/>
          <CommentCreate postId={id}/>
        </div>
      )
    }
  }
}

DetailedPostView.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  body: PropTypes.string,
  timestamp: PropTypes.number,
  voteScore: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.string),
  match: PropTypes.object,
  fetchPost: PropTypes.func,
  fetchComments: PropTypes.func,
  votePost: PropTypes.func,
  openPostModal: PropTypes.func,
  deletePost: PropTypes.func,
  history: PropTypes.object
}

const openPostModal = (values) => openModal('post_modal', values)

const mapStateToProps = (state, ownProps) => {
  const { id, category } = ownProps.match.params
  const post = get(state.posts.byId, id, {})
  const filteredPost = post.category === category ? post: {}
  return {
    ...filteredPost
  }
}

export default connect(mapStateToProps, { fetchPost, fetchComments, deletePost, votePost, openPostModal })(DetailedPostView)
