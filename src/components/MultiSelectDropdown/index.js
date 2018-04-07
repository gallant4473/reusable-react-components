import React, { Component } from 'react'

class MultiSelectDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  render () {
    return (
      <div>
        hello {this.state.open}
      </div>
    )
  }
}

export default MultiSelectDropdown
