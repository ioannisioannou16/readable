import React, { Component } from 'react'
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { deletePost, votePost } from '../actions/postActions'
import { openModal } from '../actions/modalActions'
import OptionsDropdown from './OptionsDropdown'
import { Link } from 'react-router-dom'
import Vote from "./Vote"
import toLocalTime from '../utils/dateFormatter'
import PropTypes from 'prop-types'

class Post extends Component {

  onVote = (option) => () => {
    this.props.votePost(this.props.id, option)
  }

  onEdit = (options) => () => {
    this.props.openPostModal(options)
  }

  onDelete = (id) => () => {
    this.props.deletePost(id)
  }

  render() {
    const { id, title, timestamp, author, body, voteScore, category, comments } = this.props
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <Row>
              <Col xs="10"><Link to={`/${category}/${id}`}>{title}</Link></Col>
              <Col xs="2" className="text-right"><OptionsDropdown onEdit={this.onEdit({id, title, body})} onDelete={this.onDelete(id)}/></Col>
            </Row>
          </CardTitle>
          <CardSubtitle>by <em>{author}</em> on {toLocalTime(timestamp)}</CardSubtitle>
        </CardBody>
        <CardFooter className="text-muted">
          <Vote voteScore={voteScore} onVote={this.onVote}/>
          <span className="pull-right">
            {(comments || []).length} <i className="fa fa-comments" aria-hidden="true"/>
          </span>
        </CardFooter>
      </Card>
    )
  }
}

Post.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  body: PropTypes.string,
  timestamp: PropTypes.number,
  voteScore: PropTypes.number,
  category: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.string),
  openPostModal: PropTypes.func,
  deletePost: PropTypes.func,
  votePost: PropTypes.func
}

const openPostModal = (values) => openModal('post_modal', values)

const mapStateToProps = (state, ownProps) => {
  return state.posts.byId[ownProps.id]
}

export default connect(mapStateToProps, { votePost, deletePost, openPostModal })(Post)
