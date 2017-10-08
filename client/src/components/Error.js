import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dismissError } from '../actions/errorActions'
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types'

class Error extends Component {

  onDismiss = () => {
    this.props.dismissError()
  }

  render() {
    const { error } = this.props
    return (
      <Alert color="danger" isOpen={!!error} toggle={this.onDismiss}>
        {error}
      </Alert>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

Error.propTypes = {
  error: PropTypes.string,
  dismissError: PropTypes.func
}

export default connect(mapStateToProps, { dismissError })(Error)