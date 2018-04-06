import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RadioGroup extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (value) {
    this.props.onChange(value)
  }
  renderOptions () {
    return this.props.options.map((item, i) => (
      <li key={i} className={this.props.inline ? 'inline reusable-radio-item' : 'reusable-radio-item'} >
        <input id={`radio_${item}_${i}`} value={item} checked={this.props.active === item} type='radio' onChange={() => this.onChange(item)} />
        <label htmlFor={`radio_${item}_${i}`} className='label' >
          {item}
        </label>
      </li>
    ))
  }
  render () {
    return (
      <ul className='reusable-radio' >
        {this.renderOptions()}
      </ul>
    )
  }
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool
}

RadioGroup.defaultProps = {
  inline: false,
  active: null
}

export default RadioGroup
