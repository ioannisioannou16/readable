import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import PostList from './PostList'
import SortByDropdown from './SortByDropdown'
import CreatePost from './CreatePost'
import DetailedPostView from './DetailedPostView'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Header from './Header'
import EditPostModal from './EditPostModal'
import Error from './Error'
import LoadingBar from 'react-redux-loading-bar'
import NoMatch from './NoMatch'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <LoadingBar showFastActions className="loading-bar"/>
          <Route path='/' component={Header}/>
          <Container>
            <Error/>
            <EditPostModal/>
            <Switch>
              <Route exact path='/create' component={CreatePost}/>
              <Route exact path='/:category/:id' component={DetailedPostView}/>
              <Route exact path='/:category?' render={({match}) => (
                <div>
                  <Row className="my-4">
                    <Col><SortByDropdown/></Col>
                    <Col><div className="text-right"><Link to='/create'><Button color="primary">New Post</Button></Link></div></Col>
                  </Row>
                  <PostList selectedCategory={match.params.category}/>
                </div>
              )}/>
              <Route component={NoMatch}/>
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    )
  }
}