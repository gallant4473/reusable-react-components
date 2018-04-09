### How to use CheckboxGroup component
```js
import React, { Component } from 'react'
import { CheckboxGroup } from 'reusable-react-components'

const options = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven'
]

class CheckboxExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: []
    }
  }
  onChange (value, key) {
    this.setState({
      [key]: value
    })
  }
  render () {
    return (
      <CheckboxGroup id='checkbox-example' options={options} active={this.state.active} onChange={(value) => this.onChange(value, 'active')} />
    )
  }
}

export default CheckboxExample
```
Props                     | Description
------------------------|-----------
`id`                     | Required(string), to make the label clickable for checkbox input 
`options`                | Required(Array), options to display
`active`                | Required(Array), options in the array are checked
`onChange`   | Required(function), function gets called when the options are checked or unchecked
`inline`        | Optional(boolean), to display checkbox inline
