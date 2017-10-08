import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { connect } from 'react-redux'
import { sort } from '../actions/postActions'
import PropTypes from 'prop-types'

class SortByDropdown extends Component {

  constructor(props) {
    super(props)
    this.state = { dropdownOpen: false }
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

  sortBy = (selectedSort) => () => {
    this.props.sort(selectedSort)
  }

  allSorts = [
    {field: 'voteScore', method: 'desc', description: 'Highest Score'},
    {field: 'voteScore', method: 'asc', description: 'Lowest Score'},
    {field: 'timestamp', method: 'desc', description: 'Newest Date'},
    {field: 'timestamp', method: 'asc', description: 'Oldest Date'}
  ]

  sortsToDropdownItem = (sorts) => (
    sorts.map(x => <DropdownItem key={`${x.field}_${x.method}`}
                                 onClick={this.sortBy(x)}>{x.description}</DropdownItem>)
  )

  render() {
    const activeSort = this.props.activeSort || this.allSorts[0]
    const allSortsExceptActive = this.allSorts.filter(x => activeSort.field !== x.field || activeSort.method !== x.method)
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle><i className="fa fa-sort" aria-hidden="true"/> Sort By</DropdownToggle>
        <DropdownMenu>
          {this.sortsToDropdownItem([activeSort])}
          <DropdownItem divider/>
          {this.sortsToDropdownItem(allSortsExceptActive)}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

SortByDropdown.propTypes = {
  sort: PropTypes.func,
  activeSort: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    activeSort: state.posts.sort
  }
}

export default connect(mapStateToProps, { sort })(SortByDropdown)
