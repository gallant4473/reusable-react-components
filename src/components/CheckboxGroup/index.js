import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { checkSelected, getSelected } from '../../utils'

class CheckboxGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: checkSelected(this.props.options, this.props.active)
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    const { active } = this.state
    active[event.target.name] = event.target.checked
    this.props.onChange(getSelected(active))
  }
  renderOptions () {
    return this.props.options.map((item, i) => (
      <li key={i} className={this.props.inline ? 'inline reusable-checkbox-item' : 'reusable-checkbox-item'} >
        <input id={`checkbox_${item}_${i}`} name={item} type='checkbox' checked={this.state.active[item]} onChange={this.onChange} />
        <label htmlFor={`checkbox_${item}_${i}`} className='label' >
          {item}
        </label>
      </li>
    ))
  }
  render () {
    return (
      <ul className='reusable-checkbox' >
        {this.renderOptions()}
      </ul>
    )
  }
}

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  active: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool
}

CheckboxGroup.defaultProps = {
  inline: false
}

export default CheckboxGroup
