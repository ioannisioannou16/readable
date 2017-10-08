import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'reactstrap'
import { createPost } from '../actions/postActions'
import { fetchCategories } from '../actions/categoryActions'
import { Link } from 'react-router-dom'
import renderField from '../utils/renderField'
import PropTypes from 'prop-types'

class CreatePost extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  onSubmit = (post) => {
    this.props.createPost(post).then(() => this.props.history.push('/'))
  }

  render() {
    const { handleSubmit, submitting, categories } = this.props
    return (
      <div>
        <h1>New Post</h1>
        <hr/>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Field id="author" name="author" type="text" component={renderField} label="Author"/>
          <Field id="title" name="title" type="text" component={renderField} label="Title"/>
          <Field id="category" name="category" type="select" component={renderField} label="Category">
            {[''].concat(categories).map(x => <option key={x}>{x}</option>)}
          </Field>
          <Field id="body" name="body" type="textarea" custom={{rows: 10}} component={renderField} label="Body"/>
          <Button color="primary" disabled={submitting}>Submit</Button>
          <Link to="/" className="pull-right"><Button color="danger">Cancel</Button></Link>
        </Form>
      </div>
    )
  }
}

CreatePost.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  fetchCategories: PropTypes.func,
  createPost: PropTypes.func,
  history: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const fields = ['author', 'title', 'category', 'body']

const validate = values => {
  const errors = {}
  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

CreatePost = reduxForm({ form: 'post_create', validate })(CreatePost)

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, { createPost, fetchCategories })(CreatePost)
