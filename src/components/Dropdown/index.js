import React, { Component } from 'react'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggle: false
    }
  }
  render () {
    return (
      <div>
        Dropdown {this.state.toggle}
      </div>
    )
  }
}

export default Dropdown
