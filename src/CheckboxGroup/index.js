import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class CheckboxGroup extends Component {
  onChange = (e, item) => {
    const { onChange, valueKey } = this.props
    const active = this.props.active ? this.props.active.slice() : []
    if (e.target.checked) {
      active.push(item)
    } else {
      let index = -1
      if (typeof item === 'object') {
        index = active.findIndex(d => d[valueKey] === item[valueKey])
      } else {
        index = active.indexOf(item)
      }
      active.splice(index, 1)
    }
    if (onChange) {
      onChange(active, item)
    }
  }

  renderItems () {
    const {
      options, active, id, displayKey, valueKey
    } = this.props
    return options.map((item, i) => {
      const idItem = `${id}_${i}`
      if (typeof(item) === 'object' && !Array.isArray(item)) {
        const checkActiveIndex = active.findIndex(a => a[valueKey] === item[valueKey])
        return (
          <div key={idItem} className={`reusable-checkbox-group-item ${this.props.itemClassName}`} >
            <input id={idItem} type='checkbox' checked={checkActiveIndex > -1} onChange={(e) => this.onChange(e, item)} />
            <label className={`label ${this.props.labelClass}`} htmlFor={idItem} >
              {item[displayKey]}
            </label>
          </div>
        )
      }
      return (
        <div key={idItem} className={`reusable-checkbox-group-item ${this.props.itemClassName}`} >
          <input id={idItem} type='checkbox' checked={active.indexOf(item) !== -1} onChange={(e) => this.onChange(e, item)} />
          <label className={`label ${this.props.labelClass}`} htmlFor={idItem} >
            {item}
          </label>
        </div>
      )
    })
  }

  render () {
    const { id, options, displayKey, valueKey, className, inline } = this.props
    if (id && options.every(item => typeof item !== 'object' || (item[displayKey] && item[valueKey]))) {
      return (
        <div className={`reusable-checkbox-group ${className} ${inline ? 'inline' : ''}`}>
          {this.renderItems()}
        </div>
      )
    }
    return null
  }
}

CheckboxGroup.propTypes = {
  /** Call back function onChange of CheckboxGroup */
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])
  ),
  active: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])
  ),
  itemClassName: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  displayKey: PropTypes.string,
  valueKey: PropTypes.string
}
CheckboxGroup.defaultProps = {
  onChange: null,
  options: [],
  active: '',
  itemClassName: '',
  className: '',
  inline: false,
  labelClass: '',
  displayKey: 'display',
  valueKey: 'value'
}

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
