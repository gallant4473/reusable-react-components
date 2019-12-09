import React, { Component } from 'react'
import ClickOutside from '../ClickOutside'

class MultiSelectDropdown extends Component {
  componentDidMount () {}

  onClickOutside = () => {}

  renderBox () {
    console.log(this)
    return (
      <button className='reusable-ms-dropdown-box' >
        hello
      </button>
    )
  }

  render() {
    return (
      <ClickOutside onClickOutside={this.onClickOutside} >
        <div className='reusable-ms-dropdown' >
          {this.renderBox()}
          <div className='reusable-ms-dropdown-container' >
            there
          </div>
        </div>
      </ClickOutside>
    )
  }
}

export default MultiSelectDropdown