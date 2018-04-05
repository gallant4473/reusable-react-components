import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { checkSelected, getSelected } from '../../utils'

class CheckboxGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: checkSelected(this.props.options, this.props.selected)
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    const { selected } = this.state
    selected[event.target.name] = event.target.checked
    this.props.onChange(getSelected(selected))
  }
  renderOptions () {
    return this.props.options.map((item, i) => (
      <li key={i} className={this.props.inline ? 'inline reusable-checkbox-item' : 'reusable-checkbox-item'} >
        <input id={`${item}_${i}`} name={item} type='checkbox' checked={this.state.selected[item]} onChange={this.onChange} />
        <label htmlFor={`${item}_${i}`} className='label' >
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
  selected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool
}

CheckboxGroup.defaultProps = {
  inline: false
}

export default CheckboxGroup
