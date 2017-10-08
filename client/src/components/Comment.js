import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'
import OptionsDropdown from './OptionsDropdown'
import { deleteComment, voteComment } from '../actions/commentActions'
import { openModal } from '../actions/modalActions'
import Vote from './Vote'
import toLocalTime from '../utils/dateFormatter'

class Comment extends Component {

  onVote = (option) => () => {
    this.props.voteComment(this.props.id, option)
  }

  render() {
    const { id, author, body, timestamp, voteScore, openCommentModal, deleteComment } = this.props
    const localTime = toLocalTime(timestamp)
    return (
      <Card className="mb-4 comment">
        <CardHeader>
          <div className="pull-right">
            <OptionsDropdown onEdit={() => openCommentModal({ id, body })} onDelete={() => deleteComment(id)}/>
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

const openCommentModal = (values) => openModal('comment_modal', values)

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.comments[ownProps.commentId]
  }
}

export default connect(mapStateToProps, { voteComment, openCommentModal, deleteComment })(Comment)
