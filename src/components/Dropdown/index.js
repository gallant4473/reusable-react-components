import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ClickOutside } from '../../'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open,
      inputText: ''
    }
  }
  onChange (e, value = null) {
    e.stopPropagation()
    this.setState({
      open: false,
      inputText: ''
    }, () => {
      this.props.onChange(value)
    })
  }
  onTextChange (e, value) {
    this.setState({
      inputText: value === '' ? value : e.target.value
    }, () => {
      if (this.state.inputText.length > this.props.minLength) {
        this.props.onSearch(this.state.inputText)
      }
    })
  }
  renderItems () {
    if ((this.state.inputText.length > this.props.minLength) && this.props.onSearch) {
      return this.props.searchOptions.map((item, i) => (
        <li key={i} className='reusable-dropdown-container-list-item' role='presentation' onClick={e => this.onChange(e, item)} >{item}</li>
      ))
    }
    return this.props.options.map((item, i) => (
      <li key={i} className='reusable-dropdown-container-list-item' role='presentation' onClick={e => this.onChange(e, item)} >{item}</li>
    ))
  }
  renderBox () {
    if (this.state.open && this.props.onSearch) {
      return (
        <div className='reusable-dropdown-box-search' >
          <input className='reusable-dropdown-box-search-input' placeholder={this.props.placeholder} type='text' value={this.state.inputText} onChange={e => this.onTextChange(e)} />
          {this.state.inputText.length > 0 ? <div role='presentation' onClick={e => this.onTextChange(e, '')} className='reusable-dropdown-box-clear'>&#10005;</div> : null}
        </div>
      )
    }
    return (
      <div className='reusable-dropdown-box-default' role='presentation' onClick={() => this.setState({ open: !this.state.open })} >
        {this.props.active ? this.props.active : this.props.title}
        {this.props.active ? <div role='presentation' onClick={e => this.onChange(e)} className='reusable-dropdown-box-clear'>&#10005;</div> : null}
      </div>
    )
  }
  render () {
    return (
      <div className='inline' >
        <ClickOutside onClickOutside={() => this.setState({ open: false })}>
          <div className='reusable-dropdown'>
            <div className='reusable-dropdown-box'>
              {this.renderBox()}
            </div>
            {this.state.open ? (
              <div className='reusable-dropdown-container' >
                <ul className='reusable-dropdown-container-list' >
                  {this.renderItems()}
                </ul>
              </div>
            ) : null}
          </div>
        </ClickOutside>
      </div>
    )
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  searchOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  minLength: PropTypes.number
}

Dropdown.defaultProps = {
  title: 'Select',
  open: false,
  active: null,
  placeholder: 'Search',
  searchOptions: [],
  onSearch: null,
  minLength: 0
}

export default Dropdown
