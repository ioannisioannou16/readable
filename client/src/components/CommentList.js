import React from 'react'
import Comment from './Comment'
import EditCommentModal from './EditCommentModal'

const CommentList = ({ commentIds}) => (
  <div>
    <div className="text-center h3"><span className="mr-1">Comments</span>({commentIds.length})</div>
    <hr/>
    {commentIds.map(commentId => <Comment key={commentId} commentId={commentId}/>)}
    <EditCommentModal/>
  </div>
)

export default CommentList
