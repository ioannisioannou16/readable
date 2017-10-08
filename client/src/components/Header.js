import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Link } from "react-router-dom"
import { fetchCategories } from '../actions/categoryActions'
import PropTypes from 'prop-types'

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { location, categories } = this.props
    const currentPath = location.pathname
    return (
      <div>
        <Navbar color="dark" dark fixed="top" expand="md">
          <NavbarBrand to="/" tag={Link}>readable</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {categories.map(x => (
                <NavItem key={x}>
                  <NavLink active={currentPath === `/${x}`} to={`/${x}`} tag={Link}>{x}</NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

Error.propTypes = {
  fetchCategories: PropTypes.func,
  location: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, { fetchCategories })(Header)