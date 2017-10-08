import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Card, CardBody, CardHeader, Form } from 'reactstrap'
import { createComment } from '../actions/commentActions'
import renderField from '../utils/renderField'

class CreateComment extends Component {

  onSubmit = (comment) => {
    this.props.createComment(comment, this.props.postId)
      .then(() => this.props.reset())
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <Card className="my-4">
        <CardHeader>Post your comment</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field id="author" name="author" type="text" component={renderField} label="Your name"/>
            <Field id="body" name="body" type="textarea" custom={{rows: 5, style: {resize: 'none'}}} component={renderField} label="Your comment"/>
            <Button color="primary" disabled={submitting}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

const fields = ['author', 'body']

const validate = values => {
  const errors = {}
  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

CreateComment = reduxForm({ form: 'comment_create', validate })(CreateComment)

export default connect(null, { createComment })(CreateComment)
