import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RadioGroup extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    this.props.onChange(event.target.value)
  }
  renderOptions () {
    return this.props.options.map((item, i) => (
      <li key={i} className={this.props.inline ? 'inline reusable-radio-item' : 'reusable-radio-item'} >
        <input id={`radio_${item}_${i}`} value={item} checked={this.props.selected === item} type='radio' onChange={this.onChange} />
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
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool
}

RadioGroup.defaultProps = {
  inline: false
}

export default RadioGroup
