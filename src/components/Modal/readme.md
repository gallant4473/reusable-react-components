### [Demo](https://gallant4473.github.io/docs/#/modal)

### How to use Modal component
```js
import React, { Component } from 'react'
import { Modal } from 'reusable-react-components'

class ModalExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  onClose () {
    this.setState({
      open: false
    })
  }
  render () {
    return (
      <div>
        <button onClick={() => this.setState({ open: true })} >open</button>
        <Modal dialog open={this.state.open} onClose={() => this.onClose()} size='large'>
          Hello there
        </Modal>
      </div>
    )
  }
}

export default ModalExample
```
Props                     | Description
------------------------|-----------
`open`                     | Required(bool), to make the Modal close and open
`onClose`   | Required(function), function gets called when clicked on cross icon or clicked outside the modal to set open state to false
`size`        | Optional(small, medium, large), to set width of modal
`dialog`      | Optional(bool), by default false and modal will open at 30% from top. If true, modal will open at center of screen
 
