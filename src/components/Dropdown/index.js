import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ClickOutside } from '../../'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open
    }
  }
  onChange (e, value = null) {
    e.stopPropagation()
    this.setState({
      open: false
    }, () => {
      this.props.onChange(value)
    })
  }
  renderItems () {
    return this.props.options.map((item, i) => (
      <li key={i} className='reusable-dropdown-container-list-item' role='presentation' onClick={e => this.onChange(e, item)} >{item}</li>
    ))
  }
  render () {
    return (
      <div style={{ display: 'inline-block' }} >
        <ClickOutside onClickOutside={() => this.setState({ open: false })}>
          <div className='reusable-dropdown'>
            <div className='reusable-dropdown-box' role='presentation' onClick={() => this.setState({ open: !this.state.open })} >
              {this.props.active ? this.props.active : this.props.title}
              {this.props.active ? <div role='presentation' onClick={e => this.onChange(e)} className='reusable-dropdown-box-clear'>&#10006;</div> : null}
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
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool
}

Dropdown.defaultProps = {
  title: 'Select',
  open: false
}

export default Dropdown
