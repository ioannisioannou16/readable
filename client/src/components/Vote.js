import React from 'react'

const Vote = ({ voteScore, onVote }) => (
  <span>
    <i className="fa fa-thumbs-up mr-1" aria-hidden="true" onClick={onVote("upVote")}/>
    {voteScore}
    <i className="fa fa-thumbs-down ml-1" aria-hidden="true" onClick={onVote("downVote")}/>
  </span>
)

export default Vote