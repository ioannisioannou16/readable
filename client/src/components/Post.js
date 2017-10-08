import React, { Component } from 'react'
import { Card, CardBody, CardFooter, CardSubtitle, CardTitle, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { deletePost, votePost } from '../actions/postActions'
import { openModal } from '../actions/modalActions'
import OptionsDropdown from './OptionsDropdown'
import { Link } from 'react-router-dom'
import Vote from "./Vote"
import toLocalTime from '../utils/dateFormatter'

class Post extends Component {

  onVote = (option) => () => {
    this.props.votePost(this.props.id, option)
  }

  render() {
    const { id, title, timestamp, author, body, voteScore, category, comments, openPostModal, deletePost } = this.props
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <Row>
              <Col xs="10"><Link to={`/${category}/${id}`}>{title}</Link></Col>
              <Col xs="2" className="text-right"><OptionsDropdown onEdit={() => openPostModal({id, title, body})} onDelete={() => deletePost(id)}/></Col>
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

const openPostModal = (values) => openModal('post_modal', values)

const mapStateToProps = (state, ownProps) => {
  return state.posts.byId[ownProps.id]
}

export default connect(mapStateToProps, { votePost, deletePost, openPostModal })(Post)
