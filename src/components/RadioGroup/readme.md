### How to use RadioGroup component
```js
import React, { Component } from 'react'
import { RadioGroup } from 'reusable-react-components'

const options = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven'
]

class RadioGroupExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'one'
    }
  }
  onChange (value, key) {
    this.setState({
      [key]: value
    })
  }
  render () {
    return (
      <RadioGroup id='radio-group-example' options={options} active={this.state.active} onChange={(value) => this.onChange(value, 'active')} />
    )
  }
}

export default RadioGroupExample
```
Props                     | Description
------------------------|-----------
`id`                     | Required(string), to make the label clickable for radio input 
`options`                | Required(Array), options to display
`active`                | Required(null or one of option from options)
`onChange`   | Required(function), function gets called when the option is clicked
`inline`        | Optional(boolean), to display radio buttons inline
