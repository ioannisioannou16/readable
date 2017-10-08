import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { change, Field, Form, reduxForm } from 'redux-form'
import { get } from 'lodash'
import { editComment } from '../actions/commentActions'
import { closeModal } from '../actions/modalActions'
import renderField from '../utils/renderField'
import PropTypes from 'prop-types'

class EditCommentModal extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      nextProps.changeFormValue('body', nextProps.body)
    }
  }

  onSubmit = (form) => {
    this.props.editComment(this.props.id, form.body)
      .then(() => this.props.closeCommentModal())
  }

  render() {
    const { isOpen, closeCommentModal, handleSubmit, submitting } = this.props
    return (
      <Modal isOpen={isOpen} toggle={closeCommentModal}>
        <ModalHeader toggle={closeCommentModal}>Edit your comment</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Field id="body" name="body" type="textarea" custom={{rows: 5}} component={renderField} label="Your comment" hiddenLabel={true}/>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={submitting} onClick={handleSubmit(this.onSubmit)}>Submit</Button>
          <Button color="secondary" onClick={closeCommentModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

EditCommentModal.propTypes = {
  id: PropTypes.string,
  editComment: PropTypes.func,
  closeCommentModal: PropTypes.func,
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const changeFormValue = (field, value) => change('edit_comment', field, value)

const closeCommentModal = () => closeModal('comment_modal')

const validate = values => {
  const errors = {}
  if (!values.body) {
    errors.body = 'Required field'
  }
  return errors
}

EditCommentModal = reduxForm({ form: 'edit_comment', validate })(EditCommentModal)

const mapStateToProps = (state) => {
  return get(state.modal, 'comment_modal', {})
}

export default connect(mapStateToProps, { editComment, changeFormValue, closeCommentModal })(EditCommentModal)