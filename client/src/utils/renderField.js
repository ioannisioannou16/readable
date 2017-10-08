import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const renderField = ({ id, type, label, custom, children, input, hiddenLabel, meta: { touched, error } }) => {
  const [color, valid, feedback] = touched && error ? ['danger', false, error] : touched ? ['success', true, ''] : ['', null, '']
  return (
    <FormGroup color={color}>
      <Label hidden={hiddenLabel} for={id}>{label}</Label>
      <Input valid={valid} id={id} type={type} {...custom} {...input}>
        {children}
      </Input>
      <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>
  )
}

export default renderField