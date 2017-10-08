import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { change, Field, Form, reduxForm } from 'redux-form'
import get from 'lodash/get'
import { editPost } from '../actions/postActions'
import { closeModal } from '../actions/modalActions'
import renderField from '../utils/renderField'
import PropTypes from 'prop-types'

class EditPostModal extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      nextProps.changeFormValue('title', nextProps.title)
      nextProps.changeFormValue('body', nextProps.body)
    }
  }

  onSubmit = (form) => {
    this.props.editPost(this.props.id, form.title, form.body)
      .then(() => this.props.closePostModal())
  }

  render() {
    const { isOpen, closePostModal, handleSubmit, submitting } = this.props
    return (
      <Modal isOpen={isOpen} toggle={closePostModal}>
        <ModalHeader toggle={closePostModal}>Edit your post</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Field id="title" name="title" type="text" component={renderField} label="Title"/>
            <Field id="body" name="body" type="textarea" custom={{rows: 10}} component={renderField} label="Body"/>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={submitting} onClick={handleSubmit(this.onSubmit)}>Submit</Button>
          <Button color="secondary" onClick={closePostModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

EditPostModal.propTypes = {
  id: PropTypes.string,
  editPost: PropTypes.func,
  closePostModal: PropTypes.func,
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const changeFormValue = (field, value) => change('edit_post', field, value)

const closePostModal = () => closeModal('post_modal')

const fields = ['title', 'body']

const validate = values => {
  const errors = {}
  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

EditPostModal = reduxForm({ form: 'edit_post', validate })(EditPostModal)

const mapStateToProps = (state) => {
  return get(state.modal, 'post_modal', {})
}

export default connect(mapStateToProps, { editPost, changeFormValue, closePostModal })(EditPostModal)