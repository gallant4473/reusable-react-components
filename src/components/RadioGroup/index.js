import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RadioGroup extends Component {
  static displayName = 'RadioGroup'

  onChange = (item) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(item)
    }
  }

  renderItems () {
    const {
      options, active, id, displayKey, valueKey, itemClassName, labelClass
    } = this.props
    return options.map((item, i) => {
      const idItem = `${id}_${i}`
      if (typeof(item) === 'object' && !Array.isArray(item)) {
        const checkActive = active !== null && active[valueKey] && active[valueKey] === item[this.props.valueKey]
        return (
          <div key={idItem} className={`reusable-radio-group-item ${itemClassName}`} >
            <input id={idItem} type='radio' checked={checkActive} onChange={() => this.onChange(item)} />
            <label className={`label ${labelClass}`} htmlFor={idItem} >
              {item[displayKey]}
            </label>
          </div>
        )
      }
      return (
        <div key={idItem} className={`reusable-radio-group-item ${itemClassName}`} >
          <input id={idItem} type='radio' checked={item === active} onChange={() => this.onChange(item)} />
          <label className={`label ${labelClass}`} htmlFor={idItem} >
            {item}
          </label>
        </div>
      )
    })
  }

  render () {
    const { options, displayKey, valueKey, id, className, inline } = this.props
    if (id && options.every(item => typeof item !== 'object' || (item[displayKey] && item[valueKey]))) {
      return (
        <div className={`reusable-radio-group ${className} ${inline ? 'inline' : ''}`}>
          {this.renderItems()}
        </div>
      )
    }
    return null
  }
}

RadioGroup.propTypes = {
  /** Call back function onChange of RadioGroup */
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
  itemClassName: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  displayKey: PropTypes.string,
  valueKey: PropTypes.string,
}
RadioGroup.defaultProps = {
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

export default RadioGroup
