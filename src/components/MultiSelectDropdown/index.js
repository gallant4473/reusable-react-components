import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ClickOutside, CheckboxGroup } from '../../index'

class MultiSelectDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open,
      inputText: ''
    }
  }
  onToggle () {
    this.setState({
      open: !this.state.open
    })
  }
  onSearchChange (e, value = []) {
    e.stopPropagation()
    this.props.onChange(Array.from(new Set([...this.props.active, ...value])))
  }
  onChange (e, value = []) {
    e.stopPropagation()
    this.props.onChange(value)
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
  outsideClick () {
    this.setState({
      open: false,
      inputText: ''
    })
  }
  renderItems () {
    return (
      <CheckboxGroup
        id={this.props.id}
        options={
          (this.state.inputText.length > this.props.minLength) && this.props.onSearch
          ? this.props.searchOptions : this.props.options
        }
        active={this.props.active}
        onChange={(value, e) => this.onChange(e, value)}
      />
    )
  }
  renderBox () {
    if (this.state.open && this.props.onSearch) {
      return (
        <div className='reusable-ms-dropdown-box-search'>
          <input className='reusable-ms-dropdown-box-search-input' placeholder={this.props.placeholder} type='text' value={this.state.inputText} onChange={e => this.onTextChange(e)} />
          {this.state.inputText.length > 0 ? <div role='presentation' onClick={e => this.onTextChange(e, '')} className='reusable-ms-dropdown-box-clear'>&#10005;</div> : null}
        </div>
      )
    }
    return (
      <div className='reusable-ms-dropdown-box-default' role='presentation' onClick={() => this.setState({ open: !this.state.open })} >
        {this.props.active.length > 0 ? this.props.active.length > 1 ? `${this.props.active[0]} +${this.props.active.length - 1}` : this.props.active[0] : this.props.title}
        {this.props.active.length > 0 ? <div role='presentation' onClick={e => this.onChange(e)} className='reusable-ms-dropdown-box-clear'>&#10005;</div> : null}
      </div>
    )
  }
  render () {
    return (
      <div className='inline'>
        <ClickOutside onClickOutside={e => this.outsideClick(e)}>
          <div className='reusable-ms-dropdown' >
            <div className='reusable-ms-dropdown-box'>
              {this.renderBox()}
            </div>
            {this.state.open ? (
              <div className='reusable-ms-dropdown-container' >
                {this.renderItems()}
              </div>
            ) : null}
          </div>
        </ClickOutside>
      </div>
    )
  }
}

MultiSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  open: PropTypes.bool,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  minLength: PropTypes.number,
  searchOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
}

MultiSelectDropdown.defaultProps = {
  open: false,
  active: [],
  onSearch: null,
  title: 'Select',
  placeholder: 'Search',
  minLength: 0,
  searchOptions: []
}

export default MultiSelectDropdown
