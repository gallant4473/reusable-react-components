import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ClickOutside from '../ClickOutside'
import { generateRandomString, newInstance } from '../utils'
import './index.scss'

const LoaderComponent = () => (
  <div className='reusable-loader' >
    <div className='reusable-loader-item'>Loading...</div>
  </div>
)

class Dropdown extends Component {
  static displayName = 'Dropdown'

  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open,
      cursor: 0,
      id: generateRandomString(),
      input: '',
      searchOptions: !this.props.onSearch ? [] : this.props.searchOptions
    }
  }

  componentDidMount () {
    const element = document.getElementById(this.state.id)
    if (element) {
      element.addEventListener('mousewheel', (e) => {
        const delta = e.wheelDelta || -e.detail
        this.scrollTop += (delta < 0 ? 1 : -1) * 10
        e.preventDefault()
      })
      element.addEventListener('DOMMouseScroll',(e) => {
        const delta = e.wheelDelta || -e.detail
        this.scrollTop += (delta < 0 ? 1 : -1) * 10
        e.preventDefault()
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.open !== this.props.open) {
      const { open } = this.props
      this.setState({
        open
      })
    }
    if (JSON.stringify(prevProps.searchOptions) !== JSON.stringify(this.props.searchOptions) && this.props.onSearch) {
      this.setState({
        searchOptions: newInstance(this.props.searchOptions)
      })
    }
  }

  onKeyPress = (e) => {
    const { options, loading } = this.props
    const { cursor, open, searchOptions } = this.state
    if (!loading) {
      let itemOptions = options
      if (this.state.input.length > this.props.minLength) {
        itemOptions = newInstance(searchOptions)
      }
      if (e.key === 'Enter' && itemOptions && Array.isArray(itemOptions) && itemOptions.length && this.state.open) {
        this.onItemClick(itemOptions[cursor])
      } else if (e.keyCode === 38 && cursor > 0 && open) {
        this.setScrollHeight(cursor - 1)
      } else if (e.keyCode === 40 && itemOptions && Array.isArray(itemOptions) && cursor < itemOptions.length - 1 && open) {
        this.setScrollHeight(cursor + 1)
      } else if (e.keyCode === 36 && open) {
        e.preventDefault()
        this.setScrollHeight(0)
      } else if (e.keyCode === 35 && open && itemOptions.length) {
        e.preventDefault()
        this.setScrollHeight(itemOptions.length - 1)
      } 
    }
    if (e.keyCode === 27) {
      this.setState({
        open: false,
        cursor: 0,
        input: ''
      })
    }
  }

  setScrollHeight = (cursor) => {
    this.setState({
      cursor
    }, () => {
      let height = 0
      for (let i = 0; i < this.state.cursor; i++) {
        height += this.dropdown.children[this.state.cursor].clientHeight
      }
      this.dropdown.scrollTop = height
      this.stopBodyScroll()
    })
  }

  stopBodyScroll = () => {
    window.addEventListener("keydown",(e) => {
      if([38, 40].indexOf(e.keyCode) > -1 && this.state.open) {
        e.preventDefault();
      }
    }, false);
  }

  onClick = (e) => {
    e.preventDefault()
    this.setState((prev) => ({
      open: !prev.open
    }))
  }

  onClickOutside = () => {
    this.setState({
      open: false,
      cursor: 0,
      input: ''
    })
  }

  onTextInput = (e) => {
    const searchOptions = []
    const { onSearch, options, displayKey } = this.props
    if (!onSearch) {
      options.forEach(item => {
        let text = ''
        if (typeof item === 'number') {
          text = `${item}`
        } else if (typeof item === 'object') {
          text = `${item[displayKey]}`
        } else {
          text = item
        }
        if (text.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
          searchOptions.push(item)
        }
      })
    } else {
      onSearch(e.target.value, options)
    }
    this.setState({
      input: e.target.value,
      ...(!onSearch ? { searchOptions } : {}),
      cursor: 0
    })
  }

  onItemClick = (item) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(item)
    }
    setTimeout(() => {
      this.setState({
        open: false,
        cursor: 0,
        input: ''
      })
    }, 50)
  }

  onClear = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.onItemClick(null)
  }

  onSearchClear = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      input: '',
      cursor: 0
    })
  }

  renderItems () {
    const { active, options, displayKey, valueKey, loading } = this.props
    if (loading) {
      return (
        <Fragment>
          {this.props.loader}
        </Fragment>
      )
    }
    let itemOptions = options
    if (this.state.input.length > this.props.minLength) {
      itemOptions = this.state.searchOptions
    }
    if (Array.isArray(this.props.options)) {
      if (!itemOptions.length) {
        return (
          <div className='reusable-no-data' >
            {this.state.input.length > this.props.minLength ? this.props.noDataSearchMessage : this.props.noDataMessage}
          </div>
        )
      }
      return itemOptions.map((item, i) => {
        if (typeof(item) === 'object' && !Array.isArray(item)) {
          const checkActive = active !== null && active[valueKey] && active[valueKey] === item[this.props.valueKey]
          return (
            <button onClick={() => this.onItemClick(item)} key={generateRandomString()} className={`reusable-dropdown-container-list-item ${checkActive ? 'reusable-dropdown-container-list-item-active' : ''} ${i === this.state.cursor ? 'reusable-dropdown-container-list-item-cursor' : ''}`} >
              {item[displayKey]}
            </button>
          )
        }
        return (
          <button onClick={() => this.onItemClick(item)} key={generateRandomString()} className={`reusable-dropdown-container-list-item ${active === item ? 'reusable-dropdown-container-list-item-active' : ''} ${i === this.state.cursor ? 'reusable-dropdown-container-list-item-cursor' : ''}`} >
            {item}
          </button>
        )
      })
    }
    return null
  }

  renderBox () {
    const { active, title, displayKey, search } = this.props
    const checkActive = typeof active !== 'undefined' && active !== null
    let dropdownTitle = title
    if (checkActive) {
      if (typeof active === 'object') {
        dropdownTitle = active[displayKey] ? active[displayKey] : title
      } else {
        dropdownTitle = active
      }
    }
    if (search && this.state.open) {
      return (
        <div className='reusable-dropdown-search' >
          <input placeholder={this.props.placeholder} value={this.state.input} autoFocus onChange={this.onTextInput} onKeyDown={e => this.onKeyPress(e)} className='reusable-dropdown-search-input' type='text' />
          {this.state.input.length > this.props.minLength && <div role='presentation' onClick={this.onSearchClear} className='reusable-dropdown-search-clear' />}
          {!(this.state.input.length > this.props.minLength) &&<div className="reusable-search icon" />}
        </div>
      )
    }
    return (
      <button onKeyDown={e => this.onKeyPress(e)} onClick={this.onClick} className='reusable-dropdown-box' >
        <div className='reusable-dropdown-box-title' >{dropdownTitle}</div>
        {this.props.clear && checkActive && <div role='presentation' onClick={this.onClear} className='reusable-dropdown-box-clear' />}
      </button>
    )
  }

  render() {
    const { options, displayKey, valueKey } = this.props
    if (options.every(item => typeof item !== 'object' || (item[displayKey] && item[valueKey]))) {
      return (
        <ClickOutside onClickOutside={this.onClickOutside} >
          <div className='reusable-dropdown' >
            {this.renderBox()}
            {this.state.open &&
              <div id={this.state.id} ref={(value) => { this.dropdown = value }} className='reusable-dropdown-container' >
                {this.renderItems()}
              </div>
            }
          </div>
        </ClickOutside>
      )
    }
    return null
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])
  ),
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  open: PropTypes.bool,
  clear: PropTypes.bool,
  displayKey: PropTypes.string,
  valueKey: PropTypes.string,
  search: PropTypes.bool,
  onSearch: PropTypes.func,
  minLength: PropTypes.number,
  loading: PropTypes.bool,
  loader: PropTypes.node,
  placeholder: PropTypes.string,
  searchOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])
  ),
  noDataMessage: PropTypes.string,
  noDataSearchMessage: PropTypes.string,
}

Dropdown.defaultProps = {
  onChange: null,
  options: [],
  active: null,
  title: 'Select',
  open: false,
  clear: false,
  displayKey: 'display',
  valueKey: 'value',
  search: false,
  onSearch: null,
  minLength: 0,
  loading: false,
  loader: <LoaderComponent />,
  placeholder: 'Search',
  searchOptions: [],
  noDataMessage: 'No data found',
  noDataSearchMessage: 'No data found'
}

export default Dropdown
