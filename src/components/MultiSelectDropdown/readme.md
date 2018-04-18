### [Demo](https://gallant4473.github.io/docs/#/multiselect)

### How to use Multi Select Dropdown component
```js
// Simple Multi select dropdown example
import React, { Component } from 'react'
import { MultiSelectDropdown } from 'reusable-react-components'

const options = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven'
]

class MultiSelectDropdownExample extends Component {
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
      <div>
        <MultiSelectDropdown id='multi-select-example' title='Select Option' options={options} active={this.state.active} onChange={(value) => this.onChange(value, 'active')} />
      </div>
    )
  }
}

export default MultiSelectDropdownExample

```
```js
// Multi Select Dropdown with search
import React, { Component } from 'react'
import { MultiSelectDropdown } from 'reusable-react-components'

const options = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven'
]

class MultiSelectDropdownSearchExample extends Component {
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
  onSearch (text) {
    let searchOptions = []
    // any filter function and return array of options or get array of options from API
    options.map((item) => {
      if (item.indexOf(text) >= 0) {
        searchOptions.push(item)
      }
    })
    this.setState({
      searchOptions
    })
  }
  render () {
    return (
      <div>
        <MultiSelectDropdown id='multi-select-search-example' searchOptions={this.state.searchOptions} onSearch={(value) => this.onSearch(value)} minLength={1} title='Select Option' options={options} active={this.state.active} onChange={(value) => this.onChange(value, 'active')} />
      </div>
    )
  }
}

export default MultiSelectDropdownSearchExample

```

Props                     | Description
------------------------|-----------
`id`       | Required(string), , to make the label clickable for checkbox input
`options`                | Required(Array), options to display
`active`                | Required(Array), option will be selected
`onChange`   | Required(function), function gets called when the option is checked or unchecked
`title`        | Optional(string), to display in dropdown if nothing is selected
`open`       | Optional(boolean), incase if you want the dropdown to be open at the beginning
`placeholder`   | Optional(string), incase of search
`onSearch`   | Optional(function), incase if you want search, function return input typed
`searchOptions`   | Optional(Array), pass the search options you get from API or options you get from filter function. Options gets displayed for search input inputted.
`minLength`  | Optional(Positive number), min length of input before onSearch gets triggered
`noDataText`   | Optional(string), To display message if the options is empty and onSearch is not used
`noSearchDataText`  | Optional(string), To display message if searchOptions is empty after searching
`noDataSearchText`  | Optional(string), To display message if no Options and onSearch is enabled
