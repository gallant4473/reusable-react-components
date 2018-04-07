import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CheckboxGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: this.props.active
    }
    this.onChange = this.onChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({
        active: nextProps.active
      })
    }
  }
  onChange (event) {
    const { active } = this.state
    if (event.target.checked) {
      active.push(event.target.name)
    } else {
      active.splice(active.indexOf(event.target.name), 1)
    }
    this.props.onChange(active, event)
  }
  renderOptions () {
    return this.props.options.map((item, i) => (
      <li key={i} className={this.props.inline ? 'inline reusable-checkbox-item' : 'reusable-checkbox-item'} >
        <input id={`${this.props.id}_${i}`} name={item} type='checkbox' checked={this.state.active.indexOf(item) > -1} onChange={this.onChange} />
        <label htmlFor={`${this.props.id}_${i}`} className='label' >
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
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool
}

CheckboxGroup.defaultProps = {
  inline: false
}

export default CheckboxGroup
