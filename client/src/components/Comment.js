import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'
import OptionsDropdown from './OptionsDropdown'
import { deleteComment, voteComment } from '../actions/commentActions'
import { openModal } from '../actions/modalActions'
import Vote from './Vote'
import toLocalTime from '../utils/dateFormatter'
import PropTypes from 'prop-types'

class Comment extends Component {

  onVote = (option) => () => {
    this.props.voteComment(this.props.id, option)
  }

  onEdit = (options) => () => {
    this.props.openCommentModal(options)
  }

  onDelete = (id) => () => {
    this.props.deleteComment(id)
  }

  render() {
    const { id, author, body, timestamp, voteScore } = this.props
    const localTime = toLocalTime(timestamp)
    return (
      <Card className="mb-4 comment">
        <CardHeader>
          <div className="pull-right">
            <OptionsDropdown onEdit={this.onEdit({ id, body })} onDelete={this.onDelete(id)}/>
          </div>
          <div>
            <div><i className="fa fa-user mr-2"/>{author}</div>
            <time dateTime={localTime}><i className="fa fa-clock-o mr-1"/>{localTime}</time>
          </div>
        </CardHeader>
        <CardBody className="py-0">
          <CardText tag="p">{body}</CardText>
        </CardBody>
        <CardFooter>
          <Vote voteScore={voteScore} onVote={this.onVote}/>
        </CardFooter>
      </Card>
    )
  }
}

Comment.propTypes = {
  commentId: PropTypes.string,
  id: PropTypes.string,
  author: PropTypes.string,
  body: PropTypes.string,
  timestamp: PropTypes.number,
  voteScore: PropTypes.number,
  openCommentModal: PropTypes.func,
  deleteComment: PropTypes.func,
  voteComment: PropTypes.func
}

const openCommentModal = (values) => openModal('comment_modal', values)

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.comments[ownProps.commentId]
  }
}

export default connect(mapStateToProps, { voteComment, openCommentModal, deleteComment })(Comment)
