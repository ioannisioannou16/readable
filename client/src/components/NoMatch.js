import React from 'react'
import { Button } from "reactstrap"

const goHome = (history) => () => history.push('/')

const goBack = (history) => () => history.goBack()

const NoMatch = ({ location, history }) => (
  <div className="centered">
    <h1 className="text-center mb-5">Page not found</h1>
    <Button color="link" onClick={goBack(history)}>Go back</Button>
    <Button color="link" className="pull-right" onClick={goHome(history)}>Go home</Button>
  </div>
)

export default NoMatch