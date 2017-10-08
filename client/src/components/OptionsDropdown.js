import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

class OptionsDropdown extends Component {

  constructor(props) {
    super(props)
    this.state = {dropdownOpen: false}
  }

  toggle = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle tag="span" onClick={this.toggle} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
          <i className="fa fa-chevron-down" aria-hidden="true"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.props.onEdit}><i className="fa fa-pencil mr-2" aria-hidden="true"/>Edit</DropdownItem>
          <DropdownItem onClick={this.props.onDelete}><i className="fa fa-trash mr-2" aria-hidden="true"/>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default OptionsDropdown