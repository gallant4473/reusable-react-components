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
    const {
      minLength, searchOptions, onSearch, options
    } = this.props
    if (this.state.inputText.length <= minLength && options.length === 0 && onSearch) {
      return (
        <div className='reusable-dropdown-no-data-found' >
          {this.props.noDataSearchText}
        </div>
      )
    }
    if ((this.state.inputText.length > minLength) && onSearch) {
      if (searchOptions.length === 0) {
        return (
          <div className='reusable-dropdown-no-data-found' >
            {this.props.noSearchDataText}
          </div>
        )
      }
      return searchOptions.map((item, i) => (
        <li key={i} className='reusable-dropdown-container-list-item' role='presentation' onClick={e => this.onChange(e, item)} >{item}</li>
      ))
    }
    if (options.length === 0) {
      return (
        <div className='reusable-dropdown-no-data-found' >
          {this.props.noDataText}
        </div>
      )
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
          {this.state.inputText.length > 0 ? <div role='presentation' onClick={e => this.onTextChange(e, '')} className='reusable-dropdown-box-clear'>&#10005;</div> : <div className='reusable-search-icon' />}
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
  minLength: PropTypes.number,
  noSearchDataText: PropTypes.string,
  noDataText: PropTypes.string,
  noDataSearchText: PropTypes.string
}

Dropdown.defaultProps = {
  title: 'Select',
  open: false,
  active: null,
  placeholder: 'Search',
  searchOptions: [],
  onSearch: null,
  minLength: 0,
  noSearchDataText: 'No search data found',
  noDataText: 'No data found',
  noDataSearchText: 'Search for options'
}

export default Dropdown
